
import React, { useState } from 'react';
import './LoginForm.css';
import * as yup from 'yup';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/LoginForm');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ email, password, confirmpassword }, { abortEarly: false })
      .then(() => {
        axios
          .get(`http://localhost:8000/users?email=${email}`)
          .then((res) => {
            if (res.data.length > 0) {
              const userId = res.data[0].id;
              const updatedUser = {
                ...res.data[0],
                password: password,
                confirmpassword:password, 
              };
  
              axios
                .put(`http://localhost:8000/users/${userId}`, updatedUser)
                .then(() => {
                  alert('Password updated successfully');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                  navigate('/LoginForm');
                })
                .catch((error) => {
                  console.error(error);
                  alert('Failed to update password');
                });
            } else {
              alert('User with the given email does not exist');
            }
          })
          .catch((error) => {
            console.error(error);
            alert('An error occurred while updating the password');
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
  

  return (
    <div className="login-form-container">
      <h2 className="form-title">Update Password</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            placeholder="Enter email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <br />

     
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            placeholder="Re Enter Password"
            id="confirmpassword"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}
        </div>

        <button onClick={handleSubmit} type="submit" className="login-button">
          Update Password
        </button>

        <button onClick={handleCancel} type="button" className="login-button">
          Cancel
        </button>
      </form>
    </div>
  );
};


export default ForgotPassword;
