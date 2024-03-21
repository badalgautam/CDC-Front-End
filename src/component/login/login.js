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

  const handleLogin = async () => {
    try {
      const response = await fetch('https://customerdigitalconnect.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      });
      
      const data = await response.json();
      console.log('Login token:', data.token);

      // Redirect to inbox page after successful login
      if (response.ok) {
        sessionStorage.setItem('authToken', data.token);
        window.location.href = '/inbox';
      } else {
        if (data.code === 500 && data.status === 'failed' && data.message === 'INVALID_CREDENTIALS') {
          alert('Invalid credentials. Please check your username and password.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-background">
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
            required // Added 'required' attribute for mandatory input
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
            required // Added 'required' attribute for mandatory input
          />
        </div>
        <button type="submit" className="login-button" onClick={username !== '' && password !== '' ? handleLogin : null}>Login</button>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;