import React from 'react';
import './CSS/CustomLoader.css';

const CustomLoader = () => (
  <div className="custom-loader-container">
    <div className="custom-loader">
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
    </div>
  </div>
);

export default CustomLoader;
