import React, { useState } from 'react';
import { doc, updateDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firebase instance
import './CSS/EditUserDetails.css';

const EditUserDetails = ({ userId, userData, onUpdate }) => {
  const [editedUserData, setEditedUserData] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
      const querySnapshot = await getDocs(userQuery);
      const userDocId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, 'users', userDocId);
      await updateDoc(userDocRef, {
        firstName: editedUserData.firstName,
        lastName: editedUserData.lastName,
        phone: editedUserData.phone,
      });
      onUpdate(editedUserData);
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="edit-user-details-container">
      <h3>Edit User Details</h3>
      <form onSubmit={handleSubmit} className="edit-user-details-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="firstName"
            value={editedUserData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            value={editedUserData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={editedUserData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserDetails;
