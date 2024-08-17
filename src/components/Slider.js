import React, { useEffect, useState } from 'react';
import { Carousel, Placeholder } from 'react-bootstrap';
import './CSS/Slider.css'; // Import custom CSS for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'Banners');
  const categorySnapshot = await getDocs(categoriesCollection);
  const categoryList = categorySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return categoryList;
};

const Slider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    };
    getCategories();
  }, []);

  if (loading) {
    return (
      <Carousel className="mt-3" style={{ marginLeft: "30px", marginRight: "30px" }}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Carousel.Item key={index}>
            <Placeholder as="div" animation="glow" className="slider-image-placeholder">
              <Placeholder xs={12} style={{ height: '400px' }} /> {/* Match the height of the actual images */}
            </Placeholder>
            <Carousel.Caption className="slider-caption">
              <Placeholder as="h3" animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  // Check if categories exist and are in the expected format
  if (!categories.length || !categories[0].image1) {
    return <p>No images to display</p>; // Fallback if no images are found
  }

  return (
    <Carousel className="mt-3" style={{ marginLeft: "30px", marginRight: "30px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100 slider-image"
          src={categories[0].image1}
          alt="Fresh Vegetables"
        />
        <Carousel.Caption className="slider-caption">
          <h3>Fresh Vegetables</h3>
          <p>Quality you can trust.</p>
        </Carousel.Caption>
      </Carousel.Item>
      {categories[0].image2 && (
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src={categories[0].image2}
            alt="Fresh Vegetables"
          />
          <Carousel.Caption className="slider-caption">
            <h3>Fresh Vegetables</h3>
            <p>Quality you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {categories[0].image3 && (
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src={categories[0].image3}
            alt="Fresh Vegetables"
          />
          <Carousel.Caption className="slider-caption">
            <h3>Fresh Vegetables</h3>
            <p>Quality you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {categories[0].image4 && (
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src={categories[0].image4}
            alt="Fresh Vegetables"
          />
          <Carousel.Caption className="slider-caption">
            <h3>Fresh Vegetables</h3>
            <p>Quality you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {categories[0].image5 && (
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src={categories[0].image5}
            alt="Fresh Vegetables"
          />
          <Carousel.Caption className="slider-caption">
            <h3>Fresh Vegetables</h3>
            <p>Quality you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
      {categories[0].image6 && (
        <Carousel.Item>
          <img
            className="d-block w-100 slider-image"
            src={categories[0].image6}
            alt="Fresh Vegetables"
          />
          <Carousel.Caption className="slider-caption">
            <h3>Fresh Vegetables</h3>
            <p>Quality you can trust.</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default Slider;