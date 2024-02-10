import React, { useState } from 'react';
import './Signup.css'; // Ensure you have a corresponding CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useNavigationType
import LoginPage from '../login/login';

function SignupPage() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    emailId: '',
    department: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signup submitted with data:', formData);
   };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="emailId">Email ID:</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      <button onClick={() => navigate('/login')} className="redirect-button">Go to Login</button> // Use navigate instead of useNavigate
      </form>
    </div>
  );
}

export default SignupPage;
