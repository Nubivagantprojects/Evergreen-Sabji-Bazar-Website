import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal, Alert } from 'react-bootstrap';
import { auth } from '../firebase'; // Assuming you have auth imported correctly from your firebase configuration
import { db } from '../firebase'; // Import Firestore from Firebase
import { collection, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth functions
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import './CSS/Navbar.css';

const CustomNavbar = ({ scrollToSection, categoriesRef, productsRef }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [signupFirstName, setSignupFirstName] = useState('');
    const [signupLastName, setSignupLastName] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    // Function to show alert and automatically dismiss after 1 second
    const showAlertWithAutoDismiss = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert({ type: '', message: '' });
        }, 1000); // Dismiss alert after 1 second (1000 milliseconds)
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setShowLogin(false);
            setLoginEmail('');
            setLoginPassword('');
            showAlertWithAutoDismiss('success', 'Successfully logged in!');
            // setAlert({ type: 'success', message: 'Successfully logged in!' });
        } catch (error) {
            // setAlert({ type: 'danger', message: error.message });
            showAlertWithAutoDismiss('danger', error.message);
            setShowLogin(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (signupPassword !== signupConfirmPassword) {
            // setAlert({ type: 'danger', message: 'Passwords do not match' });
            showAlertWithAutoDismiss('danger', 'Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
            // Store additional details in Firestore
            await addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid,
                firstName: signupFirstName,
                lastName: signupLastName,
                email: signupEmail,
                phone: signupPhone,
            });
            setShowSignup(false);
            setSignupFirstName('');
            setSignupLastName('');
            setSignupEmail('');
            setSignupPhone('');
            setSignupConfirmPassword('');
            setSignupPassword('');
            setShowLogin(true);
            showAlertWithAutoDismiss('success', 'Successfully signed up! Please log in.');
            // setAlert({ type: 'success', message: 'Successfully signed up! Please log in.' });
        } catch (error) {
            // setAlert({ type: 'danger', message: error.message });
            showAlertWithAutoDismiss('danger', error.message);
            setShowSignup(false);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // setAlert({ type: 'success', message: 'Successfully logged out!' });
            showAlertWithAutoDismiss('success', 'Successfully Logged out!');
        } catch (error) {
            // setAlert({ type: 'danger', message: error.message });
            showAlertWithAutoDismiss('danger', error.message);
        }
    };

    const openSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };

    const openLogin = () => {
        setShowLogin(true);
        setShowSignup(false);
    };

    return (
        <>
            {alert.message && (
                <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
                <Navbar.Brand href="#home" className="navbar-brand-custom">Evergreen Sabji Bazar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                        <Nav.Link href="#categories" className="nav-link-custom">Categories</Nav.Link>
                        <Nav.Link href="#products" className="nav-link-custom">All Products</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-custom">About Us</Nav.Link>
                        {user && <Nav.Link href="#account" className="nav-link-custom">My Account</Nav.Link>}
                        <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
                    </Nav> */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
                        <Nav.Link onClick={() => scrollToSection(categoriesRef)} className="nav-link-custom">Categories</Nav.Link>
                        <Nav.Link onClick={() => scrollToSection(productsRef)} className="nav-link-custom">All Products</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="nav-link-custom">About Us</Nav.Link>
                        {user && <Nav.Link as={Link} to="/account" className="nav-link-custom">My Account</Nav.Link>}
                        <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
                    </Nav>
                    <Form inline className="search-form-custom">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 search-bar-custom" />
                        <Button variant="outline-success" className="search-button-custom m-2">Search</Button>
                    </Form>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link onClick={handleLogout} className="nav-link-custom">Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={() => setShowLogin(true)} className="nav-link-custom">Login/Signup</Nav.Link>
                        )}
                        <Nav.Link href="#cart" className="nav-link-custom"><FaShoppingCart /> My Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Login Modal */}
            <Modal show={showLogin} onHide={() => setShowLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={openSignup}>Signup</Button>
                    <Button variant="secondary" onClick={() => setShowLogin(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Signup Modal */}
            <Modal show={showSignup} onHide={() => setShowSignup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignup}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                value={signupFirstName}
                                onChange={(e) => setSignupFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                value={signupLastName}
                                onChange={(e) => setSignupLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={signupConfirmPassword}
                                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Signup
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={openLogin}>Login</Button>
                    <Button variant="secondary" onClick={() => setShowSignup(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomNavbar;
