import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './CSS/Checkout.css'; // Import CSS file for styling

const fetchProduct = async (productId) => {
  if (!productId) {
    console.error('Product ID is missing');
    return null;
  }

  const productDoc = doc(db, 'item', productId); // Corrected doc call
  const productSnapshot = await getDoc(productDoc);
  return productSnapshot.exists() ? { id: productSnapshot.id, ...productSnapshot.data() } : null;
};

const Checkout = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      console.log('Fetching product with ID:', productId); // Debugging line
      const productData = await fetchProduct(productId);
      setProduct(productData);
    };
    getProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePayment = () => {
    // Razorpay configuration
    const options = {
      key: 'rzp_test_31wiWLVJekIJyP', // Your Razorpay key here
      amount: product.item_price * 100, // Amount in paise (₹100 = 10000 paise)
      currency: 'INR',
      name: 'Evergreen Sabji Bazar',
      description: 'Purchase Description',
      image: 'https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/final_logo.jpg?alt=media&token=c2655f4e-83a1-4d48-ab0a-383dc1da5826', // Optional: Your logo URL
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // You can also handle the response and save it to your server here
         // Navigate to order success page with product details
      navigate('/order-success', { state: { product } });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="checkout-container">
      <Card className="product-card-checkout">
        <Card.Img id='product-card-img' variant="top" src={product.item_img} />
        <div>
          <p>{product.item_name}</p>
          <p>
            Price: ₹{product.item_price} {product.item_price_unit}
          </p>
        </div>
      </Card>
      <div className="checkout-details">
        <h2>Confirm Your Purchase</h2>
        <Form className="address-form">
          <Form.Group controlId="formAddressStreet">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              name="street"
              value={address.street}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={address.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              name="state"
              value={address.state}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressZip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip code"
              name="zip"
              value={address.zip}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
        <Button onClick={handlePayment} className="mt-3">Proceed to Payment</Button>
      </div>
    </div>
  );
};

export default Checkout;
