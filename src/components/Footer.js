// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="text-white mt-5 p-4 custom-navbar">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>Contact Us</h5>
                        <p><FontAwesomeIcon icon={faPhone} /> +91 70049 43954</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> dineshkumar55085@gmail.com</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://facebook.com/evergreensabjibazar" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="m-2" style={{height:"25px"}} />
                            </a>
                            <a href="https://twitter.com/evergreensabjibazar" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className="m-2" style={{height:"25px"}}/>
                            </a>
                            <a href="https://instagram.com/evergreensabjibazar" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="m-2" style={{height:"25px"}} />
                            </a>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Our Policies</h5>
                            <li><Link to="/privacy-policy" className="nav-link-custom">Privacy Policy</Link></li>
                            <li><Link to="/cancellation-refund-policy" className="nav-link-custom">Cancellation & Refund Policy</Link></li>
                            <li><Link to="/terms-and-conditions" className="nav-link-custom">Terms & Conditions</Link></li>
                    
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h5>Address</h5>
                        <p>Baheri, Muffasil, Hazaribagh, Jharkhand, India - 825301</p>
                    </Col>
                </Row>
                <hr className="mt-4" style={{ borderColor: '#000000' }} />
                <Row className="mt-3">
                    <Col>
                        <p className="text-center">&copy; 2024 Evergreen Sabji Bazar. All Rights Reserved.</p>
                        <p className="text-center">
                            Developed by <a href="https://nubivagant.in/" target="_blank" rel="noopener noreferrer" className="nav-link-custom">Nubivagant Technology</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
