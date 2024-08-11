import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CSS/Slider.css'; // Import custom CSS for styling

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'Banners');
  // console.log(categoriesCollection)
  const categorySnapshot = await getDocs(categoriesCollection);
  // console.log(categorySnapshot)
  const categoryList = categorySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return categoryList;
};
const categories = await fetchCategories();
// console.log(categories)

const Slider = () => {
  return (
    <Carousel className='mt-3' style={{marginLeft:"30px",marginRight:"30px"}}>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image1}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image2}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image3}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image4}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image5}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={`${categories[0].image6}`}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
