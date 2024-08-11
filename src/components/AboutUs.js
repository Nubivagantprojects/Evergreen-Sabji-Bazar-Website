import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CSS/AboutUs.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <Container id="about-us-container" className="py-4">
      <h1 className="text-center mb-4">About Evergreen Sabji Bazar</h1>
      <Row className="mb-4">
        <Col md={6}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/Large%20Wallpaper%20Variety%20Of%20Fruits%20And%20Vegetables%20Covered%20In%20Backgrounds%20_%20JPG%20Free%20Download%20-%20Pikbest.jpeg?alt=media&token=de08693b-999b-4b37-9b17-d6bcf6386992"
            className="img-fluid about-img"
            alt="About Us"
          />
        </Col>
        <Col md={6}>
          <p>
            At Evergreen Sabji Bazar, we are dedicated to providing the
            freshest and highest quality fruits and vegetables to our
            customers. Located in the heart of Hazaribagh, we take pride in
            offering a wide variety of produce, ensuring that our customers have
            access to nutritious and delicious options every day.
          </p>
          <p>
            Our commitment to quality is matched only by our passion for
            exceptional customer service. Whether you are shopping in-store or
            online, our goal is to make your experience as convenient and
            enjoyable as possible. We believe that fresh produce is a key
            component of a healthy lifestyle, and we are here to make that
            accessible to everyone.
          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our History</h2>
      <Row className="mb-4">
        <Col md={12}>
          <p>
            Evergreen Sabji Bazar was founded with the vision of bringing
            farm-fresh produce to the people of Hazaribagh. Since our
            establishment, we have been dedicated to sourcing the best fruits
            and vegetables from local farmers, ensuring that our products are
            both fresh and sustainable. Our journey began as a small market, and
            through hard work and community support, we have grown into a
            trusted name in the region.
          </p>
          <p>
            Our history is a story of growth and commitment. From humble
            beginnings, we have continuously expanded our offerings and services
            to meet the evolving needs of our customers. We are proud to be a
            part of the Hazaribagh community and look forward to serving you for
            many more years to come.
          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our Team</h2>
      <Row className="mb-4" style={{display:"flex", justifyContent:"center"}} >
        <Col md={4}>
          <div className="team-member-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/dinesh%20ji.png?alt=media&token=432e39db-5627-4b2c-9ff5-2c56a57f2c25"
              className="img-fluid"
              alt="Team Member 1"
            />
            <h5>Dinesh Kumar</h5>
            <p>Founder & CEO</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="team-member-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/vicky%20yadav%20image.png?alt=media&token=9a7c0166-9fd3-4bc8-9368-f6682c0d7432"
              className="img-fluid"
              alt="Team Member 2"
            />
            <h5>Vicky Yadav</h5>
            <p>Chief Operating Officer</p>
          </div>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our Services</h2>
      <Row>
        <Col md={6}>
          <h5>Fresh Produce Delivery</h5>
          <p>
            We provide a convenient delivery service, bringing the freshest
            produce directly to your door. Our team carefully selects and packs
            your order, ensuring that you receive only the best fruits and
            vegetables.
          </p>
        </Col>
        <Col md={6}>
          <h5>Online Shopping</h5>
          <p>
            Browse our extensive range of products from the comfort of your home
            with our easy-to-use online shopping platform. We offer a seamless
            shopping experience, with secure payment options and timely
            delivery.
          </p>
        </Col>
        <Col md={6}>
          <h5>Custom Orders</h5>
          <p>
            Need something specific? We cater to custom orders to meet your
            unique requirements. Whether it’s for a special event or a large
            family gathering, we’re here to help you find exactly what you need.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
