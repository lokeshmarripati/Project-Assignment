import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jobId, setJobId] = useState('');
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };
  const handleBack = () => {
    navigate("/user-login");
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/images'); // Ideally, should be a POST request for login
      const users = response.data;
      const user = users.find(u => u.email === email && u.jobId === jobId && u.password === password);

      if (user) {
        onLogin(user);
        navigate('/admin-profile', { state: { user } });
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('Login failed. Please check your network and try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Left side image */}
      <div className="side-image">
        <img src="https://www.etaxmentor.com/wp-content/uploads/2023/06/work-at-etax.jpg" alt="Side Visual" className="side-image-left" />
      </div>

      {/* Form container */}
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group1">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-group1">
            <label>Job ID:</label>
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="input-group1">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-btn login-btn">Login</button>
          <button
            type="button"
            onClick={handleCreateAccountClick}
            className="form-btn create-account-btn"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="form-btn create-account-btn"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
