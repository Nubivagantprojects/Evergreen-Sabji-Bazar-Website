import React from 'react';
import { Carousel } from 'react-bootstrap';
import './CSS/Slider.css'; // Import custom CSS for styling

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src="https://images.pexels.com/photos/4193809/pexels-photo-4193809.jpeg"
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
          src="https://images.pexels.com/photos/5333607/pexels-photo-5333607.jpeg"
          alt="Organic Fruits"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Organic Fruits</h3>
          <p>Best in the market.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
