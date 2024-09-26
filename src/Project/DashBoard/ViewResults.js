import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './viewResults.css'; // Make sure to import the CSS file

const UserProfileWithScores = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
     const handleBack=()=>{
        navigate("/login");
}
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-profile-containers">
            <h2 className="title">Users List</h2>
            {users.length === 0 ? (
                <p className="no-users">No users found.</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Technology</th>
                            <th>Score</th>
                            <th>Total Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const scores = user.scores || [];
                            
                            return scores.length > 0 ? (
                                scores.map((score, index) => (
                                    <tr key={`${user.id}-${index}`}>
                                        {index === 0 && (
                                            <>
                                                <td rowSpan={scores.length}>
                                                    <img 
                                                        src={user.imageUrl} 
                                                        alt={user.name} 
                                                        className="user-image"
                                                    />
                                                </td>
                                                <td rowSpan={scores.length} className="user-name">{user.name}</td>
                                                <td rowSpan={scores.length} className="user-email">{user.email}</td>
                                                <td rowSpan={scores.length} className="user-address">{user.address}</td>
                                            </>
                                        )}
                                        <td>{score.technology}</td>
                                        <td>{score.score}</td>
                                        <td>{score.totalQuestions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr key={user.id}>
                                    <td>
                                        <img 
                                            src={user.imageUrl} 
                                            alt={user.name} 
                                            className="user-image"
                                        />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td colSpan="3" className="no-scores">No scores available</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
             <button
              type="button"
              className="back-account-button"
              onClick={handleBack}
            >
             Back
            </button>
        </div>
    );
};

export default UserProfileWithScores;
