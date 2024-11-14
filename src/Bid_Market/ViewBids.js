import React, { useState, useEffect } from 'react';

function ViewBids() {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        // Fetch bids from API (mocked here)
        const fetchedBids = [
            { id: 'JOD1008', price: 210 },
            { id: 'JOD1009', price: 205 },
            { id: 'JOD1010', price: 208 },
        ];
        setBids(fetchedBids.sort((a, b) => a.price - b.price));
    }, []);

    // Define styles
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            color: '#333',
            marginBottom: '15px',
        },
        list: {
            listStyleType: 'none',
            padding: '0',
        },
        listItem: {
            padding: '10px',
            marginBottom: '5px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
        },
        price: {
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Submitted Bids</h2>
            <ul style={styles.list}>
                {bids.map((bid) => (
                    <li key={bid.id} style={styles.listItem}>
                        Supplier {bid.id}: <span style={styles.price}>₹{bid.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewBids;
