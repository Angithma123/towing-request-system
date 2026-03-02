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

const API_URL = 'http://10.0.2.2:8000/api/requests';

export default function RequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const flatListRef = useRef(null);

  // ---------------- Fetch requests from backend ----------------
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      // Handle case where backend returns {data: [...]}
      const list = Array.isArray(data) ? data : data.data || [];
      // Ensure every item has an id and status
      const normalized = list.map(r => ({
        id: r.id,
        customer_name: r.customer_name,
        location: r.location,
        note: r.note || '',
        status: r.status || 'pending',
      }));

      setRequests(normalized);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ---------------- Accept request ----------------
  const acceptRequest = async (id) => {
    setProcessingId(id);

    try {
      const res = await fetch(`${API_URL}/${id}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update local state
        setRequests(prev =>
          prev.map(r =>
            r.id === id ? { ...r, status: 'assigned' } : r
          )
        );
        Alert.alert('Success', 'Request accepted!');
      } else {
        Alert.alert('Error', data.message || 'Failed to accept request');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to accept request');
    } finally {
      setProcessingId(null);
    }
  };

  // ---------------- Render each item ----------------
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.customer_name}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Note: {item.note}</Text>
      <Text>Status: {item.status}</Text>

      {item.status === 'pending' && (
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => acceptRequest(item.id)}
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
        keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

// ---------------- Styles ----------------
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