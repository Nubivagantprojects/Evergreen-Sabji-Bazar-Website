// src/components/ContactUs.js
import React from 'react';
import { Container } from 'react-bootstrap';
import './CSS/ContactUs.css'; // Import CSS file for styling

const ContactUs = () => {
  return (
    <Container className="my-5 contact">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us using the contact details below.</p>
      
      <div className="contact-details">
        <p><strong>Phone:</strong> +91 70049 43954</p>
        <p><strong>Email:</strong> dineshkumar55085@gmail.com</p>
        <p><strong>Address:</strong> Baheri, Muffasil, Hazaribagh, Jharkhand, India - 825301</p>
      </div>
    </Container>
  );
};

export default ContactUs;
