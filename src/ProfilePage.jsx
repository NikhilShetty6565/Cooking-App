/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch the logged-in user's email from local storage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      // Use the logged-in user's email to fetch the user data from the JSON server
      axios.get(`http://localhost:8000/users?email=${loggedInUser}`).then((res) => {
        if (res.data.length > 0) {
          // Set the user data in the state to display it in the profile page
          setUser(res.data[0]);
        }
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user }); // Create a copy of the user data to be edited
  };

  const handleSave = () => {
    // Send a PUT request to update user data on the JSON server
    axios.put(`http://localhost:8000/users/${editedUser.id}`, editedUser).then((res) => {
      setUser(editedUser); // Update the user state with the edited data
      setIsEditing(false); // Exit edit mode
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      {isEditing ? (
        <div className="edit-mode">
          <h2>Edit Profile</h2>

          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={editedUser?.name || ''} onChange={handleInputChange} />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={editedUser?.email || ''} onChange={handleInputChange} />
          <label htmlFor="number">Phone Number:</label>
          <input type="tel" name="number" value={editedUser?.number || ''} onChange={handleInputChange} />
          <label htmlFor="food">Food Preference:</label>
          <input type="text" name="food" value={editedUser?.food || ''} onChange={handleInputChange} />
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" value={editedUser?.age || ''} onChange={handleInputChange} />
          <label htmlFor="confirmpassword">Password:</label>
          <input type="password" name="confirmpassword" value={editedUser?.confirmpassword || ''} onChange={handleInputChange} />
          <div className="edit-btns">
          <button onClick={handleSave}>Save</button>
        
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        </div>
      ) : user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.number}</p>
          <p>Food Preference: {user.food}</p>
          <p>Age: {user.age}</p>
          <p>Password:{user.confirmpassword}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;

*/



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const x=useNavigate();

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  food: yup.string().test('is-food-selected', 'Food preference is required', (value) => {
    return value !== 'Select Pref';
  }),
  email: yup.string().email('Invalid Email Address').required('Email is required'),
  number: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
  age: yup.number().min(10,'Age must be greater than 10').max(120,'Age cannot be greater than 120').required('Age is required'),
  confirmpassword: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});


useEffect(() => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    axios.get(`http://localhost:8000/users?email=${loggedInUser}`).then((res) => {
      if (res.data.length > 0) {
        setUser(res.data[0]);
      }
    });
  }
}, []);

const handleEdit = () => {
  setIsEditing(true);
  setEditedUser({ ...user }); 
};
const handleBack=(e)=>{
  e.preventDefault();
  x('/Home')

}


const handleSave = () => {
  validationSchema
    .validate(editedUser, { abortEarly: false })
    .then(() => {
      axios.put(`http://localhost:8000/users/${editedUser.id}`, editedUser).then((res) => {
        setUser(editedUser); 
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
  setEditedUser((prevUser) => ({
    ...prevUser,
    [name]: value,
  }));
};

return (
  
  <>
 
  
  
  <div className="container125">
  
    {isEditing ? (
      <div className="edit-mode">
        <h2 className="form-title9">Edit Profile</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={editedUser?.name || ''} onChange={handleInputChange} />
        {errors.name && <p className="error-message">{errors.name}</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={editedUser?.email || ''} onChange={handleInputChange} />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label htmlFor="number">Phone Number:</label>
        <input type="tel" name="number" value={editedUser?.number || ''} onChange={handleInputChange} />
        {errors.number && <p className="error-message">{errors.number}</p>}
        <label htmlFor="food">Food Preference:</label>
        <select  id="food" name="food" value={editedUser?.food || ''} onChange={handleInputChange} >
      <option value="Veg">Veg</option>
      <option value="Non-Veg">Non-Veg</option>
      <option value="Both">Both</option>
    </select>
        {errors.food && <p className="error-message">{errors.food}</p>}
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" value={editedUser?.age || ''} onChange={handleInputChange} />
        {errors.age && <p className="error-message">{errors.age}</p>}
        <label htmlFor="confirmpassword">Password:</label>
        <input type="password" name="confirmpassword" value={editedUser?.confirmpassword || ''} onChange={handleInputChange} />
        {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}
        
        <div className="edit-btns">
        <button className="register-button1" onClick={handleSave}>Save</button>
        <button className="register-button2" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    ) : user ? (
  
      <div className="background12">
        
       <div className="back">
        <h2 className="form-title" style={{color:"white"}}>Welcome, {user.name}</h2>
       
        
          <div className="profile-photo">
            <img src={user.photo} alt="Profile" />
          
        <p className="form-title8" style={{color:"white"}}>Name: {user.name}</p>
        <p className="form-title8" style={{color:"white"}}>Email: {user.email}</p>
        <p className="form-title8" style={{color:"white"}}>Phone Number: {user.number}</p>
        <p className="form-title8" style={{color:"white"}}>Food Preference: {user.food}</p>
        <p className="form-title8" style={{color:"white"}}>Age: {user.age}</p>
        <p className="form-title8" style={{color:"white"}}>Password:{user.confirmpassword}</p>
        </div>
        <button className="register-button20" style={{color:"red" ,backgroundColor:"green",textAlign:"center"}} onClick={handleEdit}>Edit</button>
      </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  </>
);
};

export default ProfilePage;

