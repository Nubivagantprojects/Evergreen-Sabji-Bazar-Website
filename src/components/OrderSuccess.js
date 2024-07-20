import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './CSS/OrderSuccess.css'; // Import CSS file for styling

const OrderSuccess = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Get the product details from the location state

  return (
    <div className="order-success-container">
      <div className="success-message">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been successfully placed.</p>
      </div>
      {product && (
        <Card className="product-card-success">
          <Card.Img variant="top" src={product.item_img} />
          <Card.Body>
            <Card.Title>{product.item_name}</Card.Title>
            <Card.Text>
              Price: ₹{product.item_price} {product.item_price_unit}
            </Card.Text>
            <Button variant="primary" href="/">Go to Home</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default OrderSuccess;
