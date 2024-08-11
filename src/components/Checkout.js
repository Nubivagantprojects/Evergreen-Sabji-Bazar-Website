import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './CSS/Checkout.css'; // Import CSS file for styling

const fetchProduct = async (productId) => {
  if (!productId) {
    console.error('Product ID is missing');
    return null;
  }

  const productDoc = doc(db, 'item', productId);
  const productSnapshot = await getDoc(productDoc);
  return productSnapshot.exists() ? { id: productSnapshot.id, ...productSnapshot.data() } : null;
};

const fetchUserData = async (userEmail) => {
  try {
    if (userEmail) {
      const userDocRef = doc(db, 'user', userEmail);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No user document found.');
        return null;
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const Checkout = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      console.log('Fetching product with ID:', productId);
      const productData = await fetchProduct(productId);
      setProduct(productData);
    };

    const getUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userAddress = await fetchUserData(currentUser.email);
        if (userAddress) {
          setUserData(userAddress);
        }
      }
    };

    getProduct();
    getUserData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePayment = () => {

    const options = {
      key: 'rzp_test_31wiWLVJekIJyP',
      amount: product.item_price * 100,
      currency: 'INR',
      name: 'Evergreen Sabji Bazar',
      description: 'Purchase Description',
      image: 'https://firebasestorage.googleapis.com/v0/b/evergreen-sabji-bazar.appspot.com/o/final_logo.jpg?alt=media&token=c2655f4e-83a1-4d48-ab0a-383dc1da5826',
      handler: async function (response) {
        const fullAddress = `${userData.add1}, ${userData.locality}, ${userData.dist}, ${userData.state}, ${userData.pin}`;
        const tok = "OR" + Date.now();
        const now = new Date();
        const currentDateTime = now.toLocaleString();
        try {
          console.log('Razorpay Response:', response);
          if (!response.razorpay_payment_id) {
            console.error('Razorpay response is missing order ID or payment ID');
            alert('Payment failed: Order ID or Payment ID is missing.');
            return;
          }

          const orderData = {
            address: fullAddress,
            comnt: '',
            delivery_status: '0',
            id: tok,
            payment_method: 'RPAY',
            payment_status: '1',
            phone: `${userData.phone}`,
            phone2: `${userData.phone2}`,
            razorpay_order_id: `${response.razorpay_order_id}`,
            razorpay_payment_id: `${response.razorpay_payment_id}`,
            razorpay_signature: `${response.razorpay_signature}`,
            ship_partner: '',
            total: `${product.item_price}`,
            track_id: '',
            track_url: '',
            transit_status: '0',
            user: `${userData.email}`,
            verification: '1',
            ordered_at:currentDateTime,
            updated_at:currentDateTime,
            z1: '1',
            pname: `${product.item_name}`,
            pid: `${productId}`,
            purl: `${product.item_img}`,
            pamount: `${product.item_price}`,
            pqnt: '1',
            z2: '',
            z3: '',
            z4: ''
          };

          // Store order data in Firestore
          const orderDocRef = doc(db, 'order', tok);
          await setDoc(orderDocRef, orderData);

          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          navigate('/order-success', { state: { product } });
        } catch (error) {
          console.error('Error handling payment:', error);
          alert('An error occurred during payment processing. Please try again.');
        }
      },
      prefill: {
        name: userData?.customername,
        email: userData?.email,
        contact: userData?.phone
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  if (!product || !userData) return <p>Loading...</p>;

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
          <Form.Group controlId="formAddressName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={userData.customername}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formAddressMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              value={userData.phone}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formAddressAlternateMobileNumber">
            <Form.Label>Alternate Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Alternate Mobile Number"
              name="phone2"
              value={userData.phone2}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={userData.email}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formAddressStreet">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Street Address"
              name="add1"
              value={userData.add1}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressPin">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Pin Code"
              name="pin"
              value={userData.pin}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              name="state"
              value={userData.state}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressDistrict">
            <Form.Label>District</Form.Label>
            <Form.Control
              type="text"
              placeholder="District"
              name="dist"
              value={userData.dist}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddressLocality">
            <Form.Label>Locality</Form.Label>
            <Form.Control
              type="text"
              placeholder="Locality"
              name="locality"
              value={userData.locality}
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
