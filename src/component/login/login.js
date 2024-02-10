import React, { useState } from 'react';
import './login.css';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    console.log('Login submitted for username:', username);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="username-input" // Ensure this class is defined if you want specific styles
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="password-input" // Ensure this class is defined if you want specific styles
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;