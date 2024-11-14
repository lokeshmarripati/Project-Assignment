import React, { useState } from 'react';

function SupplierCommission() {
    const [productPrice, setProductPrice] = useState(0);
    const [commissionRate, setCommissionRate] = useState(1); // Initial commission rate 1%

    const calculateCommission = () => {
        const commission = (productPrice * commissionRate) / 100;
        return commission.toFixed(2); // Limit to 2 decimal places
    };

    // Define styles
    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '20px auto',
        },
        heading: {
            color: '#333',
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
            fontSize: '16px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        },
        select: {
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
        },
        result: {
            marginTop: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Supplier Commission</h2>
            <label style={styles.label}>
                Product Price:
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    placeholder="Enter product price"
                    style={styles.input}
                />
            </label>
            <label style={styles.label}>
                Commission Rate:
                <select
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    style={styles.select}
                >
                    <option value={1}>1%</option>
                    <option value={2}>2%</option>
                    <option value={3}>3%</option>
                    <option value={4}>4%</option>
                    <option value={5}>5%</option>
                </select>
            </label>
            <p style={styles.result}>Total Commission: ₹{calculateCommission()}</p>
        </div>
    );
}

export default SupplierCommission;
