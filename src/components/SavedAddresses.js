import React from 'react';
import './CSS/SavedAddress.css'; // Import CSS file for styling

const SavedAddresses = ({ addresses, onEdit, onDelete }) => {
  return (
    <div className="saved-addresses-container">
      <h3>Saved Addresses</h3>
      {addresses && addresses.length > 0 ? (
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="address-item">
              <p>{address.street}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <div className="address-actions">
                <button onClick={() => onEdit(index)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(index)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved addresses.</p>
      )}
    </div>
  );
};

export default SavedAddresses;
