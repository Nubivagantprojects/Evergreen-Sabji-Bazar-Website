import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import './CSS/Category.css'; // Import custom CSS for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchCategories = async () => {
  const categoriesCollection = collection(db, 'category');
  const categorySnapshot = await getDocs(categoriesCollection);
  const categoryList = categorySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return categoryList;
};

const Category = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await fetchCategories();
      setCategories(categoryList);
    };
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const newSelectedCategory = selectedCategory === category.id ? null : category.id;
    setSelectedCategory(newSelectedCategory);
    onSelectCategory(newSelectedCategory ? category.cat_name : null);
  };

  return (
    <div className="category-container">
      <div className="category-slide">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
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





// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import './CSS/Category.css'; // Import custom CSS for styling
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';

// const fetchCategories = async () => {
//   const categoriesCollection = collection(db, 'category');
//   const categorySnapshot = await getDocs(categoriesCollection);
//   const categoryList = categorySnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return categoryList;
// };

// const Category = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getCategories = async () => {
//       const categoryList = await fetchCategories();
//       setCategories(categoryList);
//     };
//     getCategories();
//   }, []);

//   return (
//     <div className="category-container">
//       <div className="category-slide">
//         {categories.map(category => (
//           <div key={category.id} className="category-card">
//             <Card className="category-card-inner">
//               <div className="circle-img">
//                 <Card.Img variant="top" src={category.cat_img_url} />
//               </div>
//               <Card.Body>
//                 <Card.Title>{category.cat_name}</Card.Title>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Category;
