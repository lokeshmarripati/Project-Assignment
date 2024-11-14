import React, { useState, useEffect } from 'react';

// Sample data for final transaction details
const transactionDetails = {
  finalAmount: 10500, // Example final amount
  advancePercentage: 20, // 20% advance payment
  supplierId: 'JOD1008',
  product: 'Ambuja OPC 50 Grade',
  quantity: 50
};

const AdvancePayment = () => {
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Calculate the advance amount based on the percentage
  const calculateAdvanceAmount = () => {
    const advance = (transactionDetails.advancePercentage / 100) * transactionDetails.finalAmount;
    setAdvanceAmount(advance);
  };

  useEffect(() => {
    calculateAdvanceAmount();
  }, []);

  // Handle payment confirmation
  const handlePaymentConfirmation = () => {
    setIsPaymentConfirmed(true);
    // Add logic to process the payment, such as an API call
    alert('Advance payment confirmed!');
  };

  return (
    <div style={styles.container}>
      <h2>Advance Payment</h2>

      <div style={styles.detailsContainer}>
        <p><strong>Supplier ID:</strong> {transactionDetails.supplierId}</p>
        <p><strong>Product:</strong> {transactionDetails.product}</p>
        <p><strong>Quantity:</strong> {transactionDetails.quantity} bags</p>
        <p><strong>Final Amount:</strong> ₹{transactionDetails.finalAmount.toFixed(2)}</p>
        <p><strong>Advance Percentage:</strong> {transactionDetails.advancePercentage}%</p>
        <h3>Advance Amount to Pay: ₹{advanceAmount.toFixed(2)}</h3>
      </div>

      {!isPaymentConfirmed ? (
        <button style={styles.payButton} onClick={handlePaymentConfirmation}>
          Confirm Advance Payment
        </button>
      ) : (
        <p style={styles.successMessage}>Advance payment of ₹{advanceAmount.toFixed(2)} confirmed!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  },
  detailsContainer: {
    marginBottom: '20px'
  },
  payButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  successMessage: {
    color: '#28a745',
    fontWeight: 'bold'
  }
};

export default AdvancePayment;
