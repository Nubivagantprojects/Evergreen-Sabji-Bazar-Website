// src/components/Category.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './CSS/Category.css'; // Import custom CSS for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'category');
  console.log(categoriesCollection)
  const categorySnapshot = await getDocs(categoriesCollection);
  console.log(categorySnapshot)
  const categoryList = categorySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return categoryList;
};
const categories = await fetchCategories();
console.log(categories)

const Category = () => {
  return (
    <div className="category-container">
      <div className="category-slide">
        {categories.map(category => (
          <div key={category.cat_id} className="category-card">
            <Card className="category-card-inner">
              <div className="circle-img">
                <Card.Img variant="top" src={category.cat_img_url} />
              </div>
              <Card.Body>
                <Card.Title>{category.cat_name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
