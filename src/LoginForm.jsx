
import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const x=useNavigate();
  
  const schema = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Email is required'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  });
const handleForgot=(e)=>{
  e.preventDefault();
  x('/ForgotPassword')
}
const handleRegister=(e)=>{
  e.preventDefault();
  x('/Register')
}
  const handleSubmit = (e) => {
    e.preventDefault();

    

    schema.validate({ email, password }, { abortEarly: false })
      .then(() => {
        axios
        .get(`http://localhost:8000/users?email=${email}&confirmpassword=${password}`)
        
          .then((res) => {
            console.log(res.data[0]);
            console.log(res.data.length);

            if (res.data.length > 0) {
              localStorage.setItem('loggedInUser', email);
              alert('Login success');
              x("/Home");
              
            } else {
              alert('Login failed, wrong password or username');
            }
          });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };
  return (
    <div className="login-form-container">
      <h2 className="form-title">Login</h2>
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

        <button onClick={handleSubmit} type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="options">
        <a onClick={handleForgot} href="#forgot-password">
          Forgot password?
        </a>
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

