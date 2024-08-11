// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure your Firebase setup is imported
import './CSS/Checkout.css'; // Import CSS file for styling

const CheckoutCart = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];
    const totalAmount = location.state?.totalAmount || 0;

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        locality: '',
        dist: '',
        state: '',
        pin: '',
        phone: '',
        email: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from Firebase and populate the form fields
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, 'user', user.email);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFormData({
                        name: userData.customername || '',
                        address: userData.address || '',
                        locality: userData.locality || '',
                        dist: userData.dist || '',
                        state: userData.state || '',
                        pin: userData.pin || '',
                        phone: userData.phone || '',
                        email: userData.email || user.email || '',
                    });
                }
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePayment = () => {
        const fullAddress = `${formData.address}, ${formData.locality}, ${formData.dist}, ${formData.state}, ${formData.pin}`;
        const tok = "OR" + Date.now();
        const now = new Date();
        const currentDateTime = now.toLocaleString();

        const options = {
            key: 'rzp_test_31wiWLVJekIJyP',
            amount: totalAmount * 100, // in paisa, multiply by 100
            currency: 'INR',
            name: 'Evergreen Sabji Bazar',
            description: 'Purchase from Cart',
            image: 'https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/final_logo.jpg?alt=media&token=c2655f4e-83a1-4d48-ab0a-383dc1da5826',
            handler: async function (response) {
                try {
                    if (!response.razorpay_payment_id) {
                        throw new Error('Razorpay response is missing payment ID.');
                    }

                    // Update cart items
                    const cartUpdatePromises = cart
                        .filter(item => item.isC === "1")
                        .map(item => {
                            const docRef = doc(db, 'cart', item.id);
                            return updateDoc(docRef, {
                                order: tok,
                                isC: "0"
                            });
                        });

                    await Promise.all(cartUpdatePromises);

                    // Create order document
                    const orderData = {
                        address: fullAddress,
                        comnt: "",
                        delivery_status: "0",
                        id: tok,
                        payment_method: "RPAY",
                        payment_status: "1",
                        phone: formData.phone,
                        razorpay_order_id: "",
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: "",
                        ship_partner: "",
                        total: totalAmount.toString(),
                        track_id: "",
                        track_url: "",
                        transit_status: "0",
                        user: formData.email,
                        verification: "1",
                        ordered_at: currentDateTime,
                        updated_at: currentDateTime,
                        z1: "",
                        z2: '',
                        z3: '',
                        z4: ''
                    };

                    await setDoc(doc(db, 'order', tok), orderData);

                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    navigate('/order-success', { state: { cart } });
                } catch (error) {
                    console.error('Error handling payment:', error);
                    alert(`An error occurred: ${error.message}`);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Checkout</h1>
            <Form onSubmit={(e) => e.preventDefault()}>
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
                <Form.Group controlId="formLocality" className="mb-3">
                    <Form.Label>Locality</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your locality"
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDist" className="mb-3">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your district"
                        name="dist"
                        value={formData.dist}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formState" className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPin" className="mb-3">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your pin code"
                        name="pin"
                        value={formData.pin}
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
                <Button variant="primary" type="button" className="w-100" onClick={handlePayment}>
                    Place Order
                </Button>
            </Form>
        </Container>
    );
};

export default CheckoutCart;