import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import * as yup from 'yup';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    food: yup.string().test('is-food-selected', 'Food preference is required', (value) => {
      return value !== 'Select Pref';
    }),
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    number: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    age: yup.number().min(10, 'Age must be greater than 10').max(120, 'Age cannot be greater than 120').required('Age is required'),
    confirmpassword: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    // Add any additional admin-specific fields and validation rules here
  });

  useEffect(() => {
    const loggedInAdmin = localStorage.getItem('loggedInAdmin');
    if (loggedInAdmin) {
      axios.get(`http://localhost:8000/admin?email=${loggedInAdmin}`).then((res) => {
        if (res.data.length > 0) {
          setAdmin(res.data[0]);
        }
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAdmin({ ...admin });
  };

  const handleSave = () => {
    validationSchema
      .validate(editedAdmin, { abortEarly: false })
      .then(() => {
        axios.put(`http://localhost:8000/admin/${editedAdmin.id}`, editedAdmin).then((res) => {
          setAdmin(editedAdmin);
          setIsEditing(false);
        });
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      {isEditing ? (
        <div className="edit-mode">
          <h2 className="form-title9">Edit Profile</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={editedAdmin?.name || ''} onChange={handleInputChange} />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={editedAdmin?.email || ''} onChange={handleInputChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label htmlFor="number">Phone Number:</label>
          <input type="tel" name="number" value={editedAdmin?.number || ''} onChange={handleInputChange} />
          {errors.number && <p className="error-message">{errors.number}</p>}
          <label htmlFor="food">Food Preference:</label>
          <select id="food" name="food" value={editedAdmin?.food || ''} onChange={handleInputChange}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Both">Both</option>
          </select>
          {errors.food && <p className="error-message">{errors.food}</p>}
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" value={editedAdmin?.age || ''} onChange={handleInputChange} />
          {errors.age && <p className="error-message">{errors.age}</p>}
          <label htmlFor="confirmpassword">Password:</label>
          <input type="password" name="confirmpassword" value={editedAdmin?.confirmpassword || ''} onChange={handleInputChange} />
          {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}
       
          <div className="edit-btns">
            <button className="register-button1" onClick={handleSave}>Save</button>
            <button className="register-button2" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : admin ? (
        <div className="background12">
          <h2 className="form-title" style={{ color: "white" }}>Welcome, {admin.name}</h2>
          <div className="profile-photo">
            <img src={admin.photo} alt="Profile" />
          </div>
          <p className="form-title8" style={{ color: "white" }}>Name: {admin.name}</p>
          <p className="form-title8" style={{ color: "white" }}>Email: {admin.email}</p>
          <p className="form-title8" style={{ color: "white" }}>Phone Number: {admin.number}</p>
          <p className="form-title8" style={{ color: "white" }}>Food Preference: {admin.food}</p>
          <p className="form-title8" style={{ color: "white" }}>Age: {admin.age}</p>
          <p className="form-title8" style={{ color: "white" }}>Password:{admin.confirmpassword}</p>
          <button className="register-button20" style={{ color: "red", backgroundColor: "green", textAlign: "center" }} onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminProfile;


