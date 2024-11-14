import React, { useState } from 'react';

function PostRequirement() {
    const [formData, setFormData] = useState({
        category: '',
        product: '',
        quantity: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you'd send the form data to the backend API
        console.log('Requirement posted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
                Category:
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    style={styles.select}
                >
                    <option value="">Select Category</option>
                    <option value="Building and Construction">Building and Construction</option>
                    {/* Add more categories as needed */}
                </select>
            </label>
            <label style={styles.label}>
                Product:
                <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="e.g., Ambuja OPC 50 Grade"
                    style={styles.input}
                />
            </label>
            <label style={styles.label}>
                Quantity:
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    style={styles.input}
                />
            </label>
            <button type="submit" style={styles.button}>Post Requirement</button>
        </form>
    );
}

const styles = {
    form: {
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f4f4f4',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        fontFamily: 'Arial, sans-serif',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        color: '#333',
        marginBottom: '8px',
    },
    select: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    button: {
        padding: '12px',
        borderRadius: '6px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default PostRequirement;
