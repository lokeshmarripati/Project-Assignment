import React, { useState, useEffect } from 'react';

function AdminSupplierVerification() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        // Fetch unverified suppliers from API (mocked here)
        const unverifiedSuppliers = [
            { id: 'JOD1008', name: 'Supplier A', gst: 'GST123456' },
            { id: 'JOD1009', name: 'Supplier B', gst: 'GST654321' },
        ];
        setSuppliers(unverifiedSuppliers);
    }, []);

    const handleVerify = (supplierId) => {
        // Call API to verify supplier
        console.log(`Supplier ${supplierId} verified.`);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Supplier Verification</h2>
            <ul style={styles.list}>
                {suppliers.map((supplier) => (
                    <li key={supplier.id} style={styles.listItem}>
                        <span style={styles.supplierInfo}>
                            {supplier.name} - GST: {supplier.gst}
                        </span>
                        <button style={styles.verifyButton} onClick={() => handleVerify(supplier.id)}>
                            Verify
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    supplierInfo: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#555',
    },
    verifyButton: {
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    verifyButtonHover: {
        backgroundColor: '#218838',
    }
};

export default AdminSupplierVerification;
