import React, { useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, query, where, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Importing your Firebase instance
import './CSS/AddNewAddress.css'; // Import CSS file for styling
import SavedAddresses from './SavedAddresses';

const AddNewAddress = () => {
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(null);

  const userId = auth.currentUser.uid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate(currentAddressIndex);
    } else {
      try {
        const newDocRef = await addDoc(collection(db, 'addresses'), {
          ...newAddress,
          userId,
        });
        setAddresses((prevAddresses) => [...prevAddresses, { ...newAddress, id: newDocRef.id }]);
        setNewAddress({ street: '', city: '', state: '' });
      } catch (error) {
        console.error('Error adding new address: ', error);
      }
    }
  };

  const handleEdit = (index) => {
    setNewAddress(addresses[index]);
    setIsEditing(true);
    setCurrentAddressIndex(index);
  };

  const handleUpdate = async (index) => {
    const addressToUpdate = addresses[index];
    try {
      const addressRef = doc(db, 'addresses', addressToUpdate.id);
      await updateDoc(addressRef, newAddress);
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = { ...newAddress, id: addressToUpdate.id };
      setAddresses(updatedAddresses);
      setNewAddress({ street: '', city: '', state: '' });
      setIsEditing(false);
      setCurrentAddressIndex(null);
    } catch (error) {
      console.error('Error updating address: ', error);
    }
  };

  const handleDelete = async (index) => {
    const addressToDelete = addresses[index];
    try {
      const addressRef = doc(db, 'addresses', addressToDelete.id);
      await deleteDoc(addressRef);
      setAddresses(addresses.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting address: ', error);
    }
  };

  const fetchAddresses = async () => {
    const addressesQuery = query(collection(db, 'addresses'), where('userId', '==', userId));
    const querySnapshot = await getDocs(addressesQuery);
    const fetchedAddresses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAddresses(fetchedAddresses);
  };

  React.useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="add-new-address-container">
      <h3>{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={newAddress.state}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">{isEditing ? 'Update Address' : 'Add Address'}</button>
      </form>
      <SavedAddresses addresses={addresses} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AddNewAddress;
