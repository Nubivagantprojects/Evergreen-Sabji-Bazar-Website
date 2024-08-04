// src/components/Checkout.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './CSS/Checkout.css'; // Import CSS file for styling

const CheckoutCart = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];
    const totalAmount = location.state?.totalAmount || 0;

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the order submission, e.g., send data to your server or Firebase
        console.log('Order submitted:', formData, cart);
        alert('Order placed successfully!');
        // Clear the cart and redirect to the home page or order confirmation page
        navigate('/');
    };

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Checkout</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAddress" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <h4 className="text-center mb-4">Order Summary</h4>
                <ul className="list-group mb-4">
                    {cart.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.item_name} (x{item.quantity})
                            <span>RS {Number(item.amount) * Number(item.quantity)}</span>
                        </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>Total</strong>
                        <strong>RS {totalAmount}</strong>
                    </li>
                </ul>
                <Button variant="primary" type="submit" className="w-100">
                    Place Order
                </Button>
            </Form>
        </Container>
    );
};

export default CheckoutCart;
