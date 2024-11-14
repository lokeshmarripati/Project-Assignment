import React, { useState, useEffect } from 'react';

function PlaceBid() {
    const [bidPrice, setBidPrice] = useState('');
    const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Clean up the timer
    }, []);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        // Submit the bid to the backend
        console.log('Bid placed:', bidPrice);
    };

    const formatTimeLeft = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Place your Bid</h2>
            <p style={styles.timer}>Time Left: {formatTimeLeft()}</p>
            <form onSubmit={handleBidSubmit} style={styles.form}>
                <label style={styles.label}>
                    Your Bid Price:
                    <input
                        type="number"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder="e.g., ₹210"
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>Submit Bid</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    timer: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#ff6347',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        alignSelf: 'center',
    },
};

export default PlaceBid;
