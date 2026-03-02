import React, { useState } from "react";
import api from "../api/api";

export default function RequestForm() {
  const [customerName, setCustomerName] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Client-side validation
    if (customerName.trim().length < 3) {
      setError("Customer name must be at least 3 characters.");
      return;
    }
    if (location.trim().length < 3) {
      setError("Location must be at least 3 characters.");
      return;
    }

    try {
      await api.post("/requests", {
        customer_name: customerName,
        location,
        note,
      });
      setSuccess(true);
      setCustomerName("");
      setLocation("");
      setNote("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚨 Towing Request</h2>

      {success && <p style={styles.success}>Request submitted successfully!</p>}
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Customer Name:</label>
          <input
            style={styles.input}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Location:</label>
          <input
            style={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Note:</label>
          <textarea
            style={{ ...styles.input, height: 80 }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any additional notes (optional)"
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit Request
        </button>
      </form>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
  },
  button: {
    padding: 12,
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 16,
    transition: "0.3s",
  },
  success: {
    color: "#28a745",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  error: {
    color: "#dc3545",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
};