import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RequestItem = ({ request }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Customer: {request.customer_name}</Text>
      <Text>Location: {request.location}</Text>
      <Text>Note: {request.note}</Text>
      <Text>Status: {request.status || "Pending"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RequestItem;