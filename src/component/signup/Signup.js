import React, { useState } from 'react';
import './signup.css'; // Ensure you have a corresponding CSS file for styling
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
    <div className="signup-background">
      <div className="signup-container">
      <h2 style={{ textAlign: 'center' }}>Signup</h2>
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
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
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
         <button onClick={() => navigate('/login')} className="redirect-button">Submit</button> 
      </form>
    </div>
    </div>
  );
}

export default SignupPage;
