import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import './CSS/AllProducts.css'; // Import CSS file for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchProducts = async () => {
  const productsCollection = collection(db, 'item');
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
};

const AllProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
    };
    getProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.item_catagory === selectedCategory)
    : products;

    const handleBuyNow = (product) => {
      navigate('/checkout', { state: { product } });
    };

  return (
    <div className="products-container">
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <Card>
              <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.item_img} />
              </Link>
              <Card.Body>
                <Card.Title>{product.item_name}</Card.Title>
                <Card.Text>Price: ₹{product.item_price} {product.item_price_unit}</Card.Text>
                <div className="button-container">
                  <Button variant="primary" className='btn-sm text-sm' size='sm'  onClick={() => handleBuyNow(product)}>Buy Now</Button>
                  <Button variant="outline-primary" className='btn-sm text-sm' size='sm'>Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;




// import React, { useEffect, useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './CSS/AllProducts.css'; // Import CSS file for styling
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const fetchProducts = async () => {
//   const productsCollection = collection(db, 'item');
//   const productSnapshot = await getDocs(productsCollection);
//   const productList = productSnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return productList;
// };

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const getProducts = async () => {
//       const productList = await fetchProducts();
//       setProducts(productList);
//     };
//     getProducts();
//   }, []);

//   return (
//     <div className="products-container">
//       <div className="products-grid">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <Card>
//               <Link to={`/product/${product.id}`}>
//                 <Card.Img variant="top" src={product.item_img} />
//               </Link>
//               <Card.Body>
//                 <Card.Title>{product.item_name}</Card.Title>
//                 <Card.Text>Price: ₹{product.item_price} {product.item_price_unit}</Card.Text>
//                 <div className="button-container">
//                   <Button variant="primary" className='btn-sm' size="sm">Buy Now</Button>
//                   <Button variant="outline-primary" className='btn-sm' size="sm">Add to Cart</Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
