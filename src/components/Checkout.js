// src/components/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Checkout.css'; // Create this CSS file for styling

const Checkout = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // You can save the address to state or context if needed
    navigate('/payment', { state: { address } });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleAddressSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Checkout;
