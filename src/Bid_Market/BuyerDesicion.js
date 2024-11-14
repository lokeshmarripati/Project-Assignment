import React, { useState } from 'react';

// Sample data for the lowest bid
const lowestBid = {
  supplierId: 'JOD1008',
  bidPrice: 205,
  product: 'Ambuja OPC 50 Grade'
};

const BuyerDecision = () => {
  const [decision, setDecision] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [isBiddingCanceled, setIsBiddingCanceled] = useState(false);

  // Handler for accepting the lowest bid
  const handleAccept = () => {
    setDecision('Accepted the lowest bid');
    // Add logic to process acceptance, such as an API call to confirm the bid
    alert('You have accepted the lowest bid.');
  };

  // Handler for canceling the bidding
  const handleCancel = () => {
    if (cancelReason) {
      setDecision(`Bidding canceled due to: ${cancelReason}`);
      setIsBiddingCanceled(true);
      // Add logic to process cancellation, such as an API call to cancel the bidding
      alert(`You have canceled the bidding due to: ${cancelReason}`);
    } else {
      alert('Please select a reason for cancellation.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Buyer Decision</h2>
      <div style={styles.bidDetails}>
        <p><strong>Lowest Bid:</strong> Supplier ID: {lowestBid.supplierId}, Price: ₹{lowestBid.bidPrice}/bag</p>
        <p>Product: {lowestBid.product}</p>
      </div>

      {!isBiddingCanceled ? (
        <div>
          <button style={styles.acceptButton} onClick={handleAccept}>Accept Lowest Bid</button>

          <div style={styles.cancelContainer}>
            <h3>Or Cancel the Bidding</h3>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              style={styles.select}
            >
              <option value="">Select a reason</option>
              <option value="High Prices">High Prices</option>
              <option value="Requirement Fulfilled Elsewhere">Requirement Fulfilled Elsewhere</option>
              <option value="Exploratory Bidding">Exploratory Bidding</option>
            </select>
            <button style={styles.cancelButton} onClick={handleCancel}>Cancel Bidding</button>
          </div>
        </div>
      ) : (
        <p>{decision}</p>
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
  bidDetails: {
    marginBottom: '20px'
  },
  acceptButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '20px'
  },
  cancelContainer: {
    marginTop: '20px'
  },
  select: {
    padding: '10px',
    marginBottom: '10px',
    width: '100%'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default BuyerDecision;
