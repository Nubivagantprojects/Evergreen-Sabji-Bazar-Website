import React, { useEffect, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/AllProducts.css'; // Import CSS file for styling
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const fetchProducts = async () => {
  const productsCollection = collection(db, 'item');
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
};

const AllProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
    };
    getProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.item_catagory === selectedCategory)
    : products;

  const handleBuyNow = (product) => {
    navigate(`/checkout/${product.id}`, { state: { product } });
  };

  const showAlertWithAutoDismiss = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 1000); // Dismiss alert after 1 second (1000 milliseconds)
  };

  const handleCart = async (item) => {
    const user_obj = localStorage.getItem("k45#45sed");
    if (user_obj != null) {
      const user = JSON.parse(user_obj);
      try {
        // Generate a unique ID for the new document
        const docId = "C" + Date.now();
        // Create the new document in the 'cart' collection
        await setDoc(doc(db, 'cart', docId), {
          amount: item.item_price,
          id: docId,
          isC: '1',
          isD: '0',
          isE: '1',
          item: item.id,
          item_img: item.item_img,
          item_name: item.item_name,
          order: "O" + Date.now(),
          quantity: '1',
          user: user.email,
          z1: '',
          z2: "",
          z3: '',
          z4: ''
        });

        showAlertWithAutoDismiss('success', 'Item added to cart');
        console.log("Item added to cart with ID: ", docId);
      } catch (error) {
        showAlertWithAutoDismiss('danger', 'Error adding to cart');
        console.error("Error adding item to cart: ", error);
      }
      window.location.href="/cart"
    }
  };

  return (
    <>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <div className="products-container">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Card>
                <Link to={`/product/${product.id}`}>
                  <Card.Img variant="top" src={product.item_img} />
                </Link>
                <Card.Body>
                  <Card.Title>{product.item_name}</Card.Title>
                  <Card.Text>
                    Price: ₹{product.item_price} {product.item_price_unit}
                  </Card.Text>
                  <div className="button-container">
                    <Button
                      variant="primary"
                      className='btn-sm'
                      size='sm'
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outline-primary"
                      className='btn-sm'
                      size='sm'
                      onClick={() => handleCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>

  );
};

export default AllProducts;


