import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Card, Button, Alert, Modal } from 'react-bootstrap';
import './CSS/TrackOrder.css'; // Import CSS file for styling

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderDoc = doc(db, 'order', orderId);
      try {
        const orderSnapshot = await getDoc(orderDoc);
        if (orderSnapshot.exists()) {
          setOrder(orderSnapshot.data());
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to fetch order details');
        console.error('Error fetching order details: ', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("k45#45sed"));
        const cartRef = collection(db, 'cart');
        const q = query(
          cartRef,
          where('user', '==', user.email),
          where('order', '==', orderId),
          where('isC', '==', '0')
        );

        const querySnapshot = await getDocs(q);
        let productsList = querySnapshot.docs.map(doc => doc.data());

        // If no products found in 'cart', search in 'order'
        if (productsList.length === 0) {
          const orderRef = collection(db, 'order');
          const orderQuery = query(
            orderRef,
            where('user', '==', user.email),
            where('id', '==', orderId)
          );

          const orderSnapshot = await getDocs(orderQuery);
          if (!orderSnapshot.empty) {
            const orderData = orderSnapshot.docs[0].data();
            productsList = [{
              item_name: orderData.pname,
              quantity: orderData.pqnt,
              amount: orderData.total
            }];
          }
        }

        setProducts(productsList);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error('Error fetching product details: ', err);
      }
    };

    fetchOrder();
    fetchProducts();
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
        const orderDoc = doc(db, 'order', orderId);
        await updateDoc(orderDoc, { 
            delivery_status: '2', 
            verification: '2' 
        });
        setOrder((prev) => ({ 
            ...prev, 
            delivery_status: '2',
            verification: '2'
        }));
        setShowCancelModal(false);
    } catch (err) {
        setError('Failed to cancel the order');
        console.error('Error canceling the order: ', err);
    }
};


  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!order) {
    return <p>Loading...</p>;
  }

  const getStatusLabel = (order) => {
    if (order.delivery_status === '0' && order.transit_status === '1') {
      return 'In Transit';
    }
    switch (order.delivery_status) {
      case '0':
        return 'Ordered';
      case '1':
        return 'Delivered';
      case '2':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const statusSteps = [
    { status: 'Ordered', label: 'Ordered' },
    { status: 'In Transit', label: 'In Transit' },
    { status: 'Delivered', label: 'Delivered' },
    { status: 'Cancelled', label: 'Cancelled' },
  ];

  const currentStatusLabel = getStatusLabel(order);

  return (
    <div className="track-order-container">
      <h1>Track Order</h1>
      <Card className="track-order-card">
        <Card.Body>
          <Card.Title>Order ID: {orderId}</Card.Title>
          <Card.Text>Current Status: {currentStatusLabel}</Card.Text>
          <ul className="timeline">
            {statusSteps.map((step, index) => {
              let stepClass = '';
              let contentClass = '';

              if (currentStatusLabel === step.status) {
                stepClass = 'active';
                contentClass = 'active';
              } else if (
                index <
                statusSteps.findIndex((s) => s.status === currentStatusLabel)
              ) {
                stepClass = 'completed';
                contentClass = 'completed';
              }

              return (
                <li key={index} className={`timeline-step ${stepClass}`}>
                  <div className={`timeline-step-content ${contentClass}`}>
                    <div className="step-number">{index + 1}</div>
                    <div className="step-label">{step.label}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="button-container">
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
              className="mr-2"
            >
              Back
            </Button>
            {order.delivery_status === '0' && (
              <Button
                variant="danger"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Order
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelOrder}>
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Product Details Section */}
      <div className="product-details-section">
        <h2>Product Details</h2>
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card key={index} className="product-card">
              <Card.Body>
                <Card.Title>{product.item_name}</Card.Title>
                <Card.Text>Quantity: {product.quantity}</Card.Text>
                <Card.Text>Price: ₹{product.amount}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No products found for this order.</p>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
