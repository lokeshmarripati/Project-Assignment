import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css';  // Import the CSS file for styles

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/user-create-account");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;
      const user = users.find(u => u.email === email && u.password === password);
      const loggedInUser = users.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user); // Optionally update the app state or perform actions like setting tokens
        setUser(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        navigate('/user-profile', { state: { user } });
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('Login failed. Please check your network and try again.');
    }
  };

  return (
    <>
      <nav className="navbar1">
      <h1 className="navbar1-logo">Lyros Technologies Pvt Ltd-CMMI Level 3</h1>
        <ul className="navbar1-links">
        
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin-login">Admin Login</Link></li>
          <li><Link to="/user-login">Sign Up</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
        </ul>
      </nav>
      <div className='Login-background'>

      <div className="login-containers">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Login</button>
            <button
              type="button"
              className="create-account-button"
              onClick={handleCreateAccountClick}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default UserLogin;
