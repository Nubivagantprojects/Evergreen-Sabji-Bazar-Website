import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './CSS/ChangePassword.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth();

  const handlePasswordResetRequest = async () => {
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email);
        setSuccess('Password reset email sent. Please check your inbox.');
        setEmail('');
      } else {
        setError('Please enter your email address.');
      }
    } catch (error) {
      const errorMessage = error.message;
      setError(`Error sending password reset email: ${errorMessage}`);
    }
  };

  return (
    <div className="change-password-container">
      <h3>Request Password Reset</h3>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordResetRequest}>Send Password Reset Email</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ChangePassword;
