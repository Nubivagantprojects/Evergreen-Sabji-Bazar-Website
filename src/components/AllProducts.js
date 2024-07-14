// src/components/AllProducts.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './CSS/AllProducts.css'; // Import CSS file for styling

const products = [
    { id: 9, name: 'Bread', img: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 30 },
    { id: 10, name: 'Cucumber', img: 'https://images.pexels.com/photos/256463/pexels-photo-256463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 45 },
    { id: 2, name: 'Apple', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 120 },
    { id: 3, name: 'Milk', img: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 70 },
    { id: 2, name: 'Apple', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 120 },
    { id: 3, name: 'Milk', img: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 70 },
    { id: 9, name: 'Bread', img: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 30 },
    { id: 10, name: 'Cucumber', img: 'https://images.pexels.com/photos/256463/pexels-photo-256463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 45 },
    { id: 2, name: 'Apple', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 120 },
    { id: 3, name: 'Milk', img: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 70 },
    { id: 9, name: 'Bread', img: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 30 },
    { id: 10, name: 'Cucumber', img: 'https://images.pexels.com/photos/256463/pexels-photo-256463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 45 },
    { id: 2, name: 'Apple', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 120 },
    { id: 3, name: 'Milk', img: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 70 },
    { id: 9, name: 'Bread', img: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 30 },
    { id: 10, name: 'Cucumber', img: 'https://images.pexels.com/photos/256463/pexels-photo-256463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', price: 45 },
];

const AllProducts = () => {
    return (
        <div className="products-container">
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <Card>
                            <Card.Img variant="top" src={product.img} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Price: ₹{product.price}</Card.Text>
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
