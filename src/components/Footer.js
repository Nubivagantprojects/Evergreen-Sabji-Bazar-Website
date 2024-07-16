// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>Contact Us</h5>
                        <p><FontAwesomeIcon icon={faPhone} /> +91 1234567890</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> info@evergreensabjibazar.com</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://facebook.com/evergreensabjibazar" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className="m-2"/>
                            </a>
                            <a href="https://twitter.com/evergreensabjibazar" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className="m-2"/>
                            </a>
                            <a href="https://instagram.com/evergreensabjibazar"  target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="m-2" />
                            </a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <h5>Address</h5>
                        <p>123, Green Avenue, New Delhi, India - 110001</p>
                    </Col>
                </Row>
                <hr className="mt-4" style={{ borderColor: '#bbb' }} />
                <Row className="mt-3">
                    <Col>
                        <p className="text-center">&copy; 2024 Evergreen Sabji Bazar. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;