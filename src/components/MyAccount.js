import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Assuming you have a custom hook for Firebase authentication
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Importing your Firebase instance
import './CSS/MyAccount.css';

import AddNewAddress from './AddNewAddress';
import EditUserDetails from './EditUserDetails';

const MyAccount = () => {
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;
  const [userData, setUserData] = useState(null);
  const [setAddresses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Create a query to get the user document by uid
        const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
        const querySnapshot = await getDocs(userQuery);

        // Check if the document exists
        if (!querySnapshot.empty) {
          // Since uid should be unique, we expect only one document
          const userDoc = querySnapshot.docs[0].data();
          setUserData(userDoc);

          // Fetch addresses subcollection
          const addressesSnapshot = await getDocs(collection(db, 'users', userId, 'addresses'));
          const addressesList = addressesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAddresses(addressesList);
        } else {
          console.log('No matching documents.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser && userId) {
      fetchUserData();
    }
  }, [currentUser, userId,setAddresses]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      <p><span>Email:</span> {userData.email}</p>
      <p><span>Name:</span> {userData.firstName} {userData.lastName}</p>
      <p><span>Phone:</span> {userData.phone}</p>
      {/* Add more fields as needed */}

      {/* Edit User Details Component */}
      <EditUserDetails userId={userId} userData={userData} onUpdate={setUserData} />

      {/* Add New Address Component */}
      <AddNewAddress userId={currentUser.uid} />
    </div>
  );
};

export default MyAccount;

// import React, { useEffect, useState } from 'react';
// import { auth } from '../firebase'; // Assuming you have a custom hook for Firebase authentication
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; // Importing your Firebase instance
// import './CSS/MyAccount.css';

// import AddNewAddress from './AddNewAddress';

// const MyAccount = () => {
//   const currentUser = auth.currentUser;
//   const userId = currentUser.uid;
//   const [userData, setUserData] = useState(null);
//   const [addresses, setAddresses] = useState([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Create a query to get the user document by uid
//         const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
//         const querySnapshot = await getDocs(userQuery);

//         // Check if the document exists
//         if (!querySnapshot.empty) {
//           // Since uid should be unique, we expect only one document
//           const userDoc = querySnapshot.docs[0].data();
//           setUserData(userDoc);

//           // Fetch addresses subcollection
//           const addressesSnapshot = await getDocs(collection(db, 'users', userId, 'addresses'));
//           const addressesList = addressesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//           setAddresses(addressesList);
//         } else {
//           console.log('No matching documents.');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     if (currentUser && userId) {
//       fetchUserData();
//     }
//   }, [currentUser, userId]);

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="my-account-container">
//       <h2>My Account</h2>
//       <p><span>Email:</span> {userData.email}</p>
//       <p><span>Name:</span> {userData.firstName} {userData.lastName}</p>
//       <p><span>Phone:</span> {userData.phone}</p>
//       {/* Add more fields as needed */}

//       {/* Add New Address Component */}
//       <AddNewAddress userId={currentUser.uid} />
//     </div>
//   );
// };

// export default MyAccount;
