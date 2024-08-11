import React, { useRef, useState } from 'react';
import './App.css';
import CustomNavbar from './components/Navbar';
import Slider from './components/Slider';
import Category from './components/Category';
import AllProducts from './components/AllProducts';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import MyAccount from './components/MyAccount';
import MyCart from './components/Mycart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import PrivacyPolicy from './components/PrivacyPolicy';
import CancellationRefundPolicy from './components/CancellationRefundPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import ScrollToTop from './components/ScrollToTop';
import ContactUs from './components/ContactUs';
import CheckoutCart from './components/CheckoutCart';
import MyOrders from './components/MyOrders';
import TrackOrder from './components/TrackOrder';

const App = () => {
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <div>
        <CustomNavbar
          scrollToSection={scrollToSection}
          categoriesRef={categoriesRef}
          productsRef={productsRef}
        />
        <Routes>
          <Route path="/" element={<Home categoriesRef={categoriesRef} productsRef={productsRef} scrollToSection={scrollToSection} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/my-order" element={<MyOrders />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
          <Route path="/cart" element={<MyCart/>} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/checkout/:productId" element={<Checkout />} />
          <Route path="/checkout" element={<CheckoutCart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const Home = ({ categoriesRef, productsRef, scrollToSection }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    scrollToSection(productsRef);
  };

  return (
    <>
      <Slider />
      <div className="container mt-2">
        <h2 className="mt-2" ref={categoriesRef}>Categories</h2>
        <Category onSelectCategory={handleSelectCategory} />
        <h2 className="mt-2" ref={productsRef}>All Products</h2>
        <AllProducts selectedCategory={selectedCategory} />
      </div>
    </>
  );
};

export default App;