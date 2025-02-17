import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Card, Button, Carousel, Alert, Placeholder } from 'react-bootstrap';
import './CSS/ProductDetails.css'; // Import CSS file for styling

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, 'item', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        console.log('No such product!');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const showAlertWithAutoDismiss = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 3000); // Dismiss alert after 1 second (1000 milliseconds)
  };

  const handleBuyNow = (product) => {
    const user = auth.currentUser;
    if (user) {
      if (Number(product.item_price) >= 199) {
        navigate(`/checkout/${product.id}`, { state: { product } });
      } else {
        showAlertWithAutoDismiss('danger', 'Product price must be greater than ₹199 to proceed with checkout');
      }
    } else {
      window.alert("Please Login first");
    }
  };
  

  const handleCart = async (item) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docId = "C" + Date.now();
        await setDoc(doc(db, 'cart', docId), {
          amount: item.item_price,
          id: docId,
          isC: '1',
          isD: '0',
          isE: '1',
          item: item.id,
          item_img: item.item_img,
          item_name: item.item_name,
          order: "O" + Date.now(),
          quantity: '1',
          user: user.email,
          z1: '',
          z2: "",
          z3: '',
          z4: ''
        });

        showAlertWithAutoDismiss('success', 'Item added to cart');
        // console.log("Item added to cart with ID: ", docId);
        window.alert("Item added to cart");
        window.location.href = "/cart"
      } catch (error) {
        showAlertWithAutoDismiss('danger', 'Error adding to cart');
        console.error("Error adding item to cart: ", error);
      }
    } else {
      window.alert("Please Login first");
    }
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="image-section">
          <Placeholder as="div" animation="glow" style={{ height: '400px' }}>
            <Placeholder xs={12} style={{ height: '100%' }} />
          </Placeholder>
        </div>
        <div className="text-section">
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={4} /> <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={8} />
            </Placeholder>
            <div className="button-container">
              <Placeholder.Button variant="primary" size="sm" />
              <Placeholder.Button variant="outline-primary" size="sm" className="ml-2" />
            </div>
          </Card.Body>
        </div>
      </div>
    );
  }

  const productImages = [
    product.item_img,
    product.item_img_1,
    product.item_img_2,
    product.item_img_3
  ].filter(img => img);

  return (
    <>
      {alert.message && (
        <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
          {alert.message}
        </Alert>
      )}
      <div className="product-details-container">
        <div className="image-section" style={{ border: "2px solid green", borderRadius: "5PX" }}>
          <Carousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
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
            <Card.Text>{product.item_desc}</Card.Text>
            <div className="button-container">
              <Button variant="primary" className='btn-sm' size="sm" onClick={() => handleBuyNow(product)}>Buy Now</Button>
              <Button variant="outline-primary" className='btn-sm' size="sm" onClick={() => handleCart(product)}>Add to Cart</Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;


// // src/components/ProductDetails.js
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db, auth } from '../firebase';
// import { Card, Button, Carousel, Alert } from 'react-bootstrap';
// import './CSS/ProductDetails.css'; // Import CSS file for styling

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [alert, setAlert] = useState({ type: '', message: '' });
//   const navigate = useNavigate();

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

//   const showAlertWithAutoDismiss = (type, message) => {
//     setAlert({ type, message });
//     setTimeout(() => {
//       setAlert({ type: '', message: '' });
//     }, 1000); // Dismiss alert after 1 second (1000 milliseconds)
//   };

//   const handleBuyNow = (product) => {
//     const user = auth.currentUser;
//     if (user)
//       navigate(`/checkout/${product.id}`, { state: { product } });
//     else
//       window.alert("Please Login first");
//   };

//   const handleCart = async (item) => {
//     const user = auth.currentUser;
//     if (user) {
//       // const user = JSON.parse(user_obj);
//       try {
//         // Generate a unique ID for the new document
//         const docId = "C" + Date.now();
//         // Create the new document in the 'cart' collection
//         await setDoc(doc(db, 'cart', docId), {
//           amount: item.item_price,
//           id: docId,
//           isC: '1',
//           isD: '0',
//           isE: '1',
//           item: item.id,
//           item_img: item.item_img,
//           item_name: item.item_name,
//           order: "O" + Date.now(),
//           quantity: '1',
//           user: user.email,
//           z1: '',
//           z2: "",
//           z3: '',
//           z4: ''
//         });

//         showAlertWithAutoDismiss('success', 'Item added to cart');
//         console.log("Item added to cart with ID: ", docId);
//         window.location.href = "/cart"
//       } catch (error) {
//         showAlertWithAutoDismiss('danger', 'Error adding to cart');
//         console.error("Error adding item to cart: ", error);
//       }
      
//     }
//     else{
//       window.alert("Please Login first");
//     }
//   };

//   const productImages = [product.item_img, product.item_img_1, product.item_img_2, product.item_img_3].filter(img => img);

//   return (
//     <>

//       {alert.message && (
//         <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
//           {alert.message}
//         </Alert>
//       )}
//       <div className="product-details-container">
//         <div className="image-section" style={{ border: "2px solid green", borderRadius: "5PX" }}>
//           <Carousel prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
//             {productImages.map((img, index) => (
//               <Carousel.Item key={index}>
//                 <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </div>
//         <div className="text-section">
//           <Card.Body>
//             <Card.Title>{product.item_name}</Card.Title>
//             <Card.Text>Price: ₹{product.item_price} {product.item_price_unit}</Card.Text>
//             {product.item_price_disc && (
//               <Card.Text>Discount: {product.item_price_disc}%</Card.Text>
//             )}
//             {/* <Card.Text>Unit: {product.item_price_unit}</Card.Text> */}
//             <Card.Text>{product.item_desc}</Card.Text>
//             <div className="button-container">
//               <Button variant="primary" className='btn-sm' size="sm" onClick={() => handleBuyNow(product)}>Buy Now</Button>
//               <Button variant="outline-primary" className='btn-sm' size="sm" onClick={() => handleCart(product)}>Add to Cart</Button>
//             </div>
//           </Card.Body>
//         </div>
//       </div>
//     </>

//   );
// };

// export default ProductDetails;