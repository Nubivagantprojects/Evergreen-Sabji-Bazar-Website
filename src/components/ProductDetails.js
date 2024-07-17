// src/components/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, Button, Carousel } from 'react-bootstrap';
import './CSS/ProductDetails.css'; // Import CSS file for styling

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, 'item', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        console.log('No such product!');
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const productImages = [product.item_img, product.item_img_1, product.item_img_2, product.item_img_3].filter(img => img);

  return (
    <div className="product-details-container">
      <div className="image-section">
        <Carousel>
          {productImages.map((img, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="text-section">
        <Card.Body>
          <Card.Title>{product.item_name}</Card.Title>
          <Card.Text>Price: ₹{product.item_price} {product.item_price_unit}</Card.Text>
          {product.item_price_disc && (
            <Card.Text>Discount: {product.item_price_disc}%</Card.Text>
          )}
          {/* <Card.Text>Unit: {product.item_price_unit}</Card.Text> */}
          <Card.Text>{product.item_desc}</Card.Text>
          <div className="button-container">
            <Button variant="primary" className='btn-sm' size="sm">Buy Now</Button>
            <Button variant="outline-primary" className='btn-sm' size="sm">Add to Cart</Button>
          </div>
        </Card.Body>
      </div>
    </div>
  );
};

export default ProductDetails;


// // src/components/ProductDetails.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import { Card, Button, Carousel } from 'react-bootstrap';
// import './CSS/ProductDetails.css'; // Import CSS file for styling

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const productDoc = doc(db, 'item', productId);
//       const productSnapshot = await getDoc(productDoc);
//       if (productSnapshot.exists()) {
//         setProduct(productSnapshot.data());
//       } else {
//         console.log('No such product!');
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   const productImages = [product.item_img, product.item_img_1, product.item_img_2, product.item_img_3].filter(img => img);

//   return (
//     <div className="product-details-container">
//       <Card>
//         <Carousel>
//           {productImages.map((img, index) => (
//             <Carousel.Item key={index}>
//               <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
//             </Carousel.Item>
//           ))}
//         </Carousel>
//         <Card.Body>
//           <Card.Title>{product.item_name}</Card.Title>
//           <Card.Text>Price: ₹{product.item_price}</Card.Text>
//           {product.item_price_disc && (
//             <Card.Text>Discount: {product.item_price_disc}%</Card.Text>
//           )}
//           <Card.Text>Unit: {product.item_price_unit}</Card.Text>
//           <Card.Text>{product.item_desc}</Card.Text>
//           <div className="button-container">
//             <Button variant="primary" className='btn-sm' size="sm">Buy Now</Button>
//             <Button variant="outline-primary" className='btn-sm' size="sm">Add to Cart</Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default ProductDetails;
