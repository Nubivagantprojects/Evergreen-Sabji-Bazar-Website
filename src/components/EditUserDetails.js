import React, { useState } from 'react';
import './CSS/EditUserDetails.css';

const EditUserDetails = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    customername: userData.customername,
    email: userData.email,
    phone: userData.phone,
    pin: userData.pin,
    country: userData.country,
    state: userData.state,
    district: userData.dist,
    locality: userData.locality,
    gender: userData.gender,
    address: userData.add1,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the user data
      await onUpdate(formData);
      setSuccess('Details updated successfully.');
      setError('');
    } catch (error) {
      setError('Error updating details: ' + error.message);
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="customername"
          value={formData.customername}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>PIN</label>
        <input
          type="text"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Locality</label>
        <input
          type="text"
          name="locality"
          value={formData.locality}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className='btn-password'>Update Details</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default EditUserDetails;

// import React, { useState } from 'react';
// import './CSS/EditUserDetails.css';

// const EditUserDetails = ({ userData, onUpdate }) => {
//   const [customername, setCustomerName] = useState(userData.customername || '');
//   const [phone, setPhone] = useState(userData.phone || '');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Update the user data
//       const updatedData = { customername, phone };
//       await onUpdate(updatedData);
//       setSuccess('Details updated successfully.');
//       setError('');
//     } catch (error) {
//       setError('Error updating details: ' + error.message);
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="edit-user-details">
//       <h3>Edit User Details</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="customerName">Customer Name</label>
//           <input
//             type="text"
//             id="customerName"
//             value={customername}
//             onChange={(e) => setCustomerName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="text"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Save Changes</button>
//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default EditUserDetails;
