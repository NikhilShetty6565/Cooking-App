
import React, { useState } from 'react';
import './Register.css';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AdminRegi = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    age:'',
    photo: '',
    food: '',
    password: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = useState({});
  const x=useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    food: yup.string().test('is-food-selected', 'Food preference is required', (value) => {
      return value !== 'Select Pref';
    }),
    
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    number: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    age: yup.number().min(10,'age must be greater than 10').max(120,'age cannot be greater than 120').required('Age is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  
  const handleForgot=(e)=>{
    e.preventDefault();
    x('/AdminLoginForm')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        fetch('http://localhost:8000/admin')
          .then((res) => res.json())
          .then((users) => {
            const existingUser = users.find((user) => user.email === formData.email);
  
            if (existingUser) {
              alert('User with the same email already exists');
            } else {
              fetch('http://localhost:8000/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  alert('Registration is successful');
                  x('/AdminLoginForm');
                });
            }
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


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form-container1">
      <h2 className="form-title1"> Admin Registration</h2>
      <form className="login-form1">
        <div className="form-group1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            name="name" 
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <br />

        <div className="form-group1">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            placeholder="Upload Photo"
            id="photo"
            value={formData.photo}
            onChange={handleChange}
            name="photo"
            
          />
          
        </div>
        <br />

        <div className="form-group1">
          <label htmlFor="food">Food Pref:</label>
          <select
            id="food"
            onChange={handleChange}
            value={formData.food}
            name="food"
            required
          >
            <option value="">Select Pref</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Both">Both</option>
          </select>
          {errors.food && <p className="error-message">{errors.food}</p>}
        </div>
        <br />

        <div className="form-group1"> 
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            placeholder="Enter email Address"
            id="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <br />

        <div className="form-group1">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            id="tel"
            value={formData.number}
            onChange={handleChange}
            name="number"
            required
          />
          {errors.number && <p className="error-message">{errors.number}</p>}
        </div>
        <br />

        <div className="form-group1">
  <label htmlFor="age">Age:</label>
  <input
    type="number" 
    placeholder="Enter Age"
    id="age"
    value={formData.age}
    onChange={handleChange}
    name="age"  
    required
  />
  {errors.age && <p className="error-message">{errors.age}</p>}
</div>
        <br />

        <div className="form-group1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <br />

        <div className="form-group1">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            placeholder="Re Enter Password"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}
        </div>
        

        <button onClick={handleSubmit} type="submit" className="login-button">
          Register
        </button>
      </form>
      <div className="options">
      <a onClick={handleForgot} href="#forgot-password">
          Already have an Account?
        </a>
      </div>
    </div>
  );
};

export default AdminRegi;
