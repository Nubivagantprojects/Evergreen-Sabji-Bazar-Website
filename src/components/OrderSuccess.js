import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './CSS/OrderSuccess.css'; // Import CSS file for styling

const OrderSuccess = () => {
  const location = useLocation();
  const { product, cart } = location.state || {}; // Get product or cart from the location state

  return (
    <div id="order-success-container">
      <div id="success-message">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been successfully placed.</p>
      </div>
      <div id="product-cards-container">
        {product && (
          <Card className="product-card-success">
            <Card.Img variant="top" src={product.item_img} className="card-img" />
            <Card.Body>
              <Card.Title className="card-title">{product.item_name}</Card.Title>
              <Card.Text className="card-text">
                Price: ₹{product.item_price} {product.item_price_unit}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {cart && cart.length > 0 && cart.map((item, index) => (
          <Card key={index} className="product-card-success">
            <Card.Img variant="top" src={item.item_img} className="card-img" />
            <Card.Body>
              <Card.Title className="card-title">{item.item_name}</Card.Title>
              <Card.Text className="card-text">
                Price: ₹{item.amount}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        {!product && (!cart || cart.length === 0) && (
          <p id="no-items">No items in your order.</p>
        )}
      </div>
      <Button variant="primary" id="shop-more-button" href="/">Shop More</Button>
    </div>
  );
};

export default OrderSuccess;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Card, Button } from 'react-bootstrap';
// import './CSS/OrderSuccess.css'; // Import CSS file for styling

// const OrderSuccess = () => {
//   const location = useLocation();
//   const { product, cart } = location.state || {}; // Get product or cart from the location state

//   return (
//     <div className="order-success-container">
//       <div className="success-message">
//         <h1>Thank You for Your Purchase!</h1>
//         <p>Your order has been successfully placed.</p>
//       </div>
//       <div className="product-cards-container">
//         {product && (
//           <Card className="product-card-success">
//             <Card.Img variant="top" src={product.item_img} />
//             <Card.Body>
//               <Card.Title>{product.item_name}</Card.Title>
//               <Card.Text>
//                 Price: ₹{product.item_price} {product.item_price_unit}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         )}
//         {cart && cart.length > 0 && cart.map((item, index) => (
//           <Card key={index} className="product-card-success">
//             <Card.Img variant="top" src={item.item_img} />
//             <Card.Body>
//               <Card.Title>{item.item_name}</Card.Title>
//               <Card.Text>
//                 Price: ₹{item.amount}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         ))}
//         {!product && (!cart || cart.length === 0) && (
//           <p>No items in your order.</p>
//         )}
//       </div>
//       <Button variant="primary" href="/">Shop More</Button>
//     </div>
//   );
// };

// export default OrderSuccess;