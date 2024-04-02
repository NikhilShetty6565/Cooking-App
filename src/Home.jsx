

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); 

  const [user, setUser] = useState(null);

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

  const handleLogout = (e) => {
e.preventDefault();
    const shouldLogout = window.confirm("Are you sure you want to logout?");
    if (shouldLogout) {
    localStorage.removeItem('loggedInUser'); 
    navigate('/LoginForm'); 
    }
    
  };
  return (
    <div className="header">
      <nav>
        <div className="link">
          <Link to="/Welcome" style={{ padding: 5 }} className="link1">Home</Link>
          <Link to="/AdminLoginForm" style={{ padding: 5 }} className="link1">Endorsed recipes</Link>
          <Link to="/Recipe" style={{ padding: 5 }} className="link1">Explore</Link>
          <Link to="/ProfilePage" style={{ padding: 5 }} className="link1">Profile</Link>
          
          <Link to="/LoginForm" onClick={handleLogout}  style={{ padding: 5 }} className="link1">Logout</Link>
        </div>
      </nav>
      <div className="po">
        <h1 style={{color:"white"}}>Hi, {user?.name}! What's Cooking</h1>
        <h4 style={{color:"white"}}>Thank you for joining us! <br></br>
          Explore our recipes and endorse the ones you find the tastiest!<br></br>
          All your followers would love to lead a healthy and hence happy life!! Go ahead and help them lead a <br></br>
          healthier life with your endorsements</h4>
      </div>
    </div>
  )
}

export default Home;

