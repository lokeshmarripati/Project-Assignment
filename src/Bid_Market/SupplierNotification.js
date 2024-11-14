import React, { useEffect, useState } from 'react';

function SupplierNotifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // This would come from WebSocket or API in real implementation
        const newNotification = {
            message: 'New Requirement for Cement: 50 bags of Ambuja OPC 50 Grade',
        };
        setNotifications([...notifications, newNotification]);
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Notifications for Suppliers</h2>
            {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                    <div key={index} style={styles.notificationBox}>
                        <p style={styles.message}>{notif.message}</p>
                    </div>
                ))
            ) : (
                <p style={styles.noNotifications}>No notifications yet.</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    notificationBox: {
        backgroundColor: '#e6f7ff',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '10px',
        border: '1px solid #b3d7ff',
    },
    message: {
        fontSize: '16px',
        color: '#333',
        margin: 0,
    },
    noNotifications: {
        fontSize: '16px',
        color: '#999',
        textAlign: 'center',
    },
};

export default SupplierNotifications;
