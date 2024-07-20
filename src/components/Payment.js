// src/components/Payment.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/Payment.css'; // Create this CSS file for styling

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address } = location.state;

  const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_31wiWLVJekIJyP', // Replace with your Razorpay key
      amount: '50000', // Amount in paise
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com/logo.png',
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate('/');
      },
      prefill: {
        name: 'Your Name',
        email: 'your-email@example.com',
        contact: '9999999999',
      },
      notes: {
        address,
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p>Address: {address}</p>
      <button onClick={handlePayment} className="btn btn-primary">Pay Now</button>
    </div>
  );
};

export default Payment;
