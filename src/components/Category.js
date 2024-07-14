// src/components/Category.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './CSS/Category.css'; // Import custom CSS for styling

const categories = [
  { id: 1, name: 'Vegetables', img: 'https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg' },
  { id: 2, name: 'Fruits', img: 'https://images.pexels.com/photos/5333607/pexels-photo-5333607.jpeg' },
  { id: 3, name: 'Dairy', img: 'https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg' },
  { id: 4, name: 'Meat', img: 'https://images.pexels.com/photos/6287447/pexels-photo-6287447.jpeg' },
  { id: 5, name: 'Seafood', img: 'https://images.pexels.com/photos/1581383/pexels-photo-1581383.jpeg' },
  { id: 6, name: 'Bakery', img: 'https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg' },
  { id: 3, name: 'Dairy', img: 'https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg' },
  { id: 4, name: 'Meat', img: 'https://images.pexels.com/photos/6287447/pexels-photo-6287447.jpeg' },
  { id: 5, name: 'Seafood', img: 'https://images.pexels.com/photos/1581383/pexels-photo-1581383.jpeg' },
  { id: 6, name: 'Bakery', img: 'https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg' },
];

const Category = () => {
  return (
    <div className="category-container">
      <div className="category-slide">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <Card className="category-card-inner">
              <div className="circle-img">
                <Card.Img variant="top" src={category.img} />
              </div>
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
