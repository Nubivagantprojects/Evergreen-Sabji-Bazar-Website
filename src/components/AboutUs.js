import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './CSS/AboutUs.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">About Us</h1>
      <Row className="mb-4">
        <Col md={6}>
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080" className="img-fluid rounded" alt="About Us" />
        </Col>
        <Col md={6}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porttitor orci justo, sit amet consequat
            magna maximus a. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae; Curabitur varius odio ut metus vehicula, quis convallis felis ullamcorper.
          </p>
          <p>
            Suspendisse potenti. Quisque commodo efficitur tellus, non mollis nunc blandit ac. Aenean posuere lectus
            quis orci convallis, nec euismod lorem tristique. Nullam vel urna nec ante efficitur convallis. Ut
            vestibulum urna a sapien ullamcorper laoreet. Integer ut ex rutrum, congue velit at, laoreet ex. Proin
            quis sollicitudin nulla. Sed lacinia velit in ligula efficitur, nec blandit ex malesuada. Quisque ac urna
            vitae velit tincidunt vehicula. Vivamus lacinia pellentesque eros, at mattis eros efficitur sit amet.
          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our History</h2>
      <Row className="mb-4">
        <Col md={12}>
          <p>
            Evergreen Sabji Bazar was founded in [Year] with the mission to provide fresh and quality produce to our
            customers. Over the years, we have grown from a small local market to a well-known name in the community.
            Our commitment to quality and customer satisfaction has been the cornerstone of our success.
          </p>
          <p>
            From humble beginnings, we have expanded our services and reach, continually adapting to the needs of our
            customers. Our history is a testament to our dedication and hard work, and we are proud to serve our
            community with the best products available.
          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our Team</h2>
      <Row className="mb-4">
        <Col md={4}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080" className="img-fluid rounded-circle mb-2" alt="Team Member 1" />
          <h5 className="text-center">John Doe</h5>
          <p className="text-center">CEO</p>
        </Col>
        <Col md={4}>
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080" className="img-fluid rounded-circle mb-2" alt="Team Member 2" />
          <h5 className="text-center">Jane Smith</h5>
          <p className="text-center">COO</p>
        </Col>
        <Col md={4}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080" className="img-fluid rounded-circle mb-2" alt="Team Member 3" />
          <h5 className="text-center">Emily Johnson</h5>
          <p className="text-center">CFO</p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Our Services</h2>
      <Row>
        <Col md={6}>
          <h5>Fresh Produce Delivery</h5>
          <p>
            We offer delivery services to bring fresh and quality produce right to your doorstep. Our delivery service
            ensures that you get the best products without having to leave the comfort of your home.
          </p>
        </Col>
        <Col md={6}>
          <h5>Online Ordering</h5>
          <p>
            Our online platform allows you to browse and order from our extensive selection of products. With a few
            clicks, you can have everything you need delivered to you, making shopping more convenient than ever.
          </p>
        </Col>
        <Col md={6}>
          <h5>Custom Orders</h5>
          <p>
            We understand that every customer has unique needs. That’s why we offer custom orders to ensure you get
            exactly what you want. Whether you need a special mix of produce or specific quantities, we are here to
            help.
          </p>
        </Col>
        <Col md={6}>
          <h5>Community Support</h5>
          <p>
            As a local business, we are committed to supporting our community. We regularly participate in local
            events and provide support to community initiatives, helping to make our community a better place.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
