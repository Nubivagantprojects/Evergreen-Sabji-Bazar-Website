// src/components/AllProducts.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './CSS/AllProducts.css'; // Import CSS file for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'item');
  console.log(categoriesCollection)
  const categorySnapshot = await getDocs(categoriesCollection);
  console.log(categorySnapshot)
  const categoryList = categorySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return categoryList;
};
const products = await fetchCategories();
// console.log(products)

const AllProducts = () => {
    return (
        <div className="products-container">
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <Card>
                            <Card.Img variant="top" src={product.item_img} />
                            <Card.Body>
                                <Card.Title>{product.item_name}</Card.Title>
                                <Card.Text>Price: ₹{product.item_price}</Card.Text>
                                <div className="button-container">
                                    <Button variant="primary" size="sm">Buy Now</Button>
                                    <Button variant="outline-primary" size="sm">Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
