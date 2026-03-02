import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Pusher from 'pusher-js/react-native';

const API_URL = 'http://10.0.2.2:8000/api/requests';

export default function RequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const flatListRef = useRef(null);

  // Fetch requests from backend (public API)
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch requests from server');
    } finally {
      setLoading(false);
    }
  };

  // Accept request and update backend
  const handleAcceptRequest = async (id) => {
    setProcessingId(id);

    // Optimistic UI update
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'assigned' } : r))
    );

    try {
      // Call public accept endpoint
      const res = await fetch(`${API_URL}/${id}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to assign request');

      const updatedRequest = await res.json();

      // Sync UI with backend response
      setRequests(prev =>
        prev.map(r => (r.id === id ? updatedRequest : r))
      );

      Alert.alert('Success', 'Request assigned successfully!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to assign request');

      // Revert UI if backend failed
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, status: 'pending' } : r))
      );
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();

    // Real-time updates via Pusher
    const pusher = new Pusher('bcf5a7bee51634501802', {
      cluster: 'ap2',
      useTLS: true,
    });

    const channel = pusher.subscribe('towing-requests');

    channel.bind('request-updated', (data) => {
      setRequests(prev => {
        const exists = prev.some(r => r.id === data.towingRequest.id);
        if (exists) {
          return prev.map(r =>
            r.id === data.towingRequest.id ? data.towingRequest : r
          );
        } else {
          return [data.towingRequest, ...prev];
        }
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('towing-requests');
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.customer_name}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Note: {item.note}</Text>
      <Text>Status: {item.status || 'pending'}</Text>

      {item.status === 'pending' && (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptRequest(item.id)}
          disabled={processingId === item.id}
        >
          <Text style={styles.acceptButtonText}>
            {processingId === item.id ? 'Processing...' : 'Accept Request'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading Requests...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={requests}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});