import React, { useState } from "react";
import api from "./api/api";

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

    // Validation
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
      <h2 style={styles.heading}> Towing Request</h2>

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

// Responsive and accessible styles
const styles = {
  container: {
    maxWidth: 600,
    width: "90%",
    margin: "40px auto",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    backgroundColor: "#fefefe",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 25,
    color: "#0056b3", // stronger blue
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: 600,
    fontSize: "1rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#007bff",
    outline: "none",
  },
  button: {
    padding: 14,
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "background-color 0.3s",
  },
  success: {
    color: "#28a745",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  error: {
    color: "#dc3545",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
};