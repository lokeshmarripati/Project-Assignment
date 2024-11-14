import React, { useState, useEffect } from 'react';

// Sample data for bid acceptance and final details
const bidDetails = {
  supplierId: 'JOD1008',
  bidPricePerUnit: 205,
  product: 'Ambuja OPC 50 Grade',
  quantity: 50,
  gst: 18, // 18% GST
  logistics: 500,
  loadingUnloading: 300,
  insurance: 200,
  otherCharges: 100,
  bidAcceptedTime: new Date().getTime() // Current time to simulate bid acceptance
};

const FinalizationOfTransaction = () => {
  const [finalAmount, setFinalAmount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60 * 1000); // 24 hours in milliseconds
  const [isApproved, setIsApproved] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // Calculate the final amount (product price, GST, logistics, etc.)
  const calculateFinalAmount = () => {
    const productPrice = bidDetails.bidPricePerUnit * bidDetails.quantity;
    const gstAmount = (bidDetails.gst / 100) * productPrice;
    const total = productPrice + gstAmount + bidDetails.logistics + bidDetails.loadingUnloading + bidDetails.insurance + bidDetails.otherCharges;
    setFinalAmount(total);
  };

  // Timer for the buyer to approve the transaction
  useEffect(() => {
    calculateFinalAmount();
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval);
          handleAutoCancel(); // Automatically cancel if time runs out
        }
        return prevTime - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle approval of the final amount
  const handleApprove = () => {
    setIsApproved(true);
    setIsCanceled(false);
    alert('You have approved the final amount.');
  };

  // Handle cancellation of the bid
  const handleCancel = () => {
    setIsCanceled(true);
    setIsApproved(false);
    alert('You have canceled the bid.');
  };

  // Automatically cancel the bid if the time expires
  const handleAutoCancel = () => {
    if (!isApproved) {
      setIsCanceled(true);
      alert('The bid has been automatically canceled due to inactivity.');
    }
  };

  // Convert milliseconds to hours, minutes, and seconds for the countdown timer
  const formatTime = (milliseconds) => {
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div style={styles.container}>
      <h2>Finalization of Transaction</h2>
      <div style={styles.detailsContainer}>
        <p><strong>Supplier ID:</strong> {bidDetails.supplierId}</p>
        <p><strong>Product:</strong> {bidDetails.product}</p>
        <p><strong>Quantity:</strong> {bidDetails.quantity} bags</p>
        <p><strong>Price per Bag:</strong> ₹{bidDetails.bidPricePerUnit}</p>
        <p><strong>GST (18%):</strong> ₹{((bidDetails.gst / 100) * bidDetails.bidPricePerUnit * bidDetails.quantity).toFixed(2)}</p>
        <p><strong>Logistics:</strong> ₹{bidDetails.logistics}</p>
        <p><strong>Loading/Unloading:</strong> ₹{bidDetails.loadingUnloading}</p>
        <p><strong>Insurance:</strong> ₹{bidDetails.insurance}</p>
        <p><strong>Other Charges:</strong> ₹{bidDetails.otherCharges}</p>
        <h3>Total Final Amount: ₹{finalAmount.toFixed(2)}</h3>
      </div>

      <div style={styles.timerContainer}>
        <p>Time Remaining to Approve: {formatTime(timeRemaining)}</p>
      </div>

      <div style={styles.buttonsContainer}>
        {!isApproved && !isCanceled && (
          <>
            <button style={styles.approveButton} onClick={handleApprove}>Approve Final Amount</button>
            <button style={styles.cancelButton} onClick={handleCancel}>Cancel Bid</button>
          </>
        )}

        {isApproved && <p style={styles.successMessage}>You have approved the final amount.</p>}
        {isCanceled && <p style={styles.cancelMessage}>The bid has been canceled.</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
  },
  detailsContainer: {
    marginBottom: '20px'
  },
  timerContainer: {
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  approveButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  successMessage: {
    color: '#28a745',
    fontWeight: 'bold'
  },
  cancelMessage: {
    color: '#dc3545',
    fontWeight: 'bold'
  }
};

export default FinalizationOfTransaction;
