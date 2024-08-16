import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Import Firebase authentication and Firestore instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './CSS/MyAccount.css';
import EditUserDetails from './EditUserDetails';
import ChangePassword from './ChangePassword'; // Component for changing password
import CustomLoader from './CustomLoader';

const MyAccount = () => {
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email;
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userEmail) {
          // Fetch user data using email as document ID
          const userDocRef = doc(db, 'user', userEmail);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No user document found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser, userEmail]);

  const handleUserUpdate = async (updatedData) => {
    try {
      const userDocRef = doc(db, 'user', userEmail);
      await updateDoc(userDocRef, updatedData);
      setUserData(prevData => ({ ...prevData, ...updatedData }));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
    if (isChangingPassword) {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordToggle = () => {
    setIsChangingPassword(prev => !prev);
    if (isEditing) {
      setIsEditing(false);
    }
  };

  if (!userData) {
    return <CustomLoader />;
  }

  return (
    <div className="my-account-container">
      <h2>My Account</h2>
      <p><span>Email:</span> {userData.email}</p>
      <p><span>Name:</span> {userData.customername}</p>
      <p><span>Phone:</span> {userData.phone}</p>
      <p><span>Gender:</span> {userData.gender}</p>
      <p><span>PIN:</span> {userData.pin}</p>
      <p><span>Country:</span> {userData.country}</p>
      <p><span>State:</span> {userData.state}</p>
      <p><span>District:</span> {userData.dist}</p>
      <p><span>Locality:</span> {userData.locality}</p>
      <p><span>Address:</span> {userData.add1}</p>
      {/* Add more fields as needed */}

      <button onClick={handleEditToggle}>
        {isEditing ? 'Cancel Editing' : 'Edit Details'}
      </button>
      <button onClick={handlePasswordToggle}>
        {isChangingPassword ? 'Cancel Change Password' : 'Change Password'}
      </button>

      {isEditing && (
        <EditUserDetails userData={userData} onUpdate={handleUserUpdate} />
      )}

      {isChangingPassword && (
        <ChangePassword />
      )}
    </div>
  );
};

export default MyAccount;