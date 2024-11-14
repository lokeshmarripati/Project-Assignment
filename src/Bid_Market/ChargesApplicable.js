import React, { useState } from 'react';

function PostRequirement1() {
    const [formData, setFormData] = useState({
        category: '',
        product: '',
        quantity: '',
    });
    const [transactionFee, setTransactionFee] = useState(0); // Initially free (₹0)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transactionFee > 0) {
            alert(`You need to pay ₹${transactionFee} to post the requirement.`);
        } else {
            alert("Your requirement has been posted for free!");
        }
        // Here you'd handle the transaction logic and API call
        console.log('Requirement posted:', formData);
    };

    // Simulate condition to charge fee later (could be based on time or other logic)
    const checkFee = () => {
        // Example logic: charge ₹50 or ₹100 based on product category
        if (formData.category === 'Building and Construction') {
            setTransactionFee(50); // Charge ₹50 for this category
        } else if (formData.category === 'Other') {
            setTransactionFee(100); // Charge ₹100 for other categories
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Category:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        onBlur={checkFee}
                        style={styles.select}
                    >
                        <option value="">Select Category</option>
                        <option value="Building and Construction">Building and Construction</option>
                        <option value="Other">Other</option>
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

                <p style={styles.transactionFee}>
                    Transaction Fee: ₹{transactionFee} {transactionFee > 0 && "(will be charged on posting)"}
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    select: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    transactionFee: {
        marginTop: '10px',
        color: '#ff6347',
        fontWeight: 'bold',
    },
};

export default PostRequirement1;
