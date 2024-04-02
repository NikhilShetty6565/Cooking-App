import React from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome( ) {
  
  const x=useNavigate();
  
  const handleLogin=(e)=>{
    e.preventDefault();
    x('/LoginForm')
  }

  const handleRegister=(e)=>{
    e.preventDefault();
    x('/Register')
  }

  const handleAdmin=(e)=>{
    e.preventDefault();
    x('/AdminLoginForm')
  }

  return (
    
    <div className='welcome-container' >
        
      <aside style={{float:"right",marginRight:"8cm",marginTop:"5px",marginLeft:"20px"}}>
     
      <div className='welcome-container2'>
      
    <h3 style={{fontFamily:"italic",textAlign:"center",marginTop:"50px",color:"white",fontSize:'30px'}}><span style={{color:"red"}}>W</span>ant to create own Recipies??</h3>
     <div style={{width:"250px", marginLeft:"30px"}}>
      <ul>
        <li>
      
      To write your own Recipies click on get started!!
        </li>
        <br></br>
        <li>
          Create an Admin Account
        </li>
        <br></br>
        <li>And there you go!!</li>
      </ul>
      </div>
    
    <button onClick={handleAdmin} style={{width:"200px",height:"50px",marginTop:"30px",marginLeft:"55px",marginBottom:"10px",marginRight:"25px"}} className='welcome-button'>Get Started</button>
    </div>
    
</aside>
         <div className='welcome-heading'>
      <h1 ><span style={{color:"green"}}>W</span>hat's Cookingg??</h1>
      <h4 style={{color:"white"}}>Not sure What to cook?</h4>
      </div>
     <div style={{width:"550px", color:"white"}}>Here is your one stop solution to find recipes that best match the ingredients in hand. What's Cooking? makes your life easier by helping you decide what to cook based on the time and ingredients in hand. You no longer have to surf various websites to find the "perfect" recipe.
</div>
<br></br>
<div style={{width:"600px",color:"white"}}>
All you need to do is, feed in the time and ingredients in hand, and then let the application do the job!</div>
    <br></br>
    <div style={{color:"white"}}>
      To explore the Recipies:
    </div>
    <ul>
      <li style={{color:"white"}}>
    <div style={{color:"white"}}>
    Already have an account?<button style={{marginLeft:"10px"}} onClick={handleLogin} className='welcome-button'> login</button> <span></span>click here to login.
    </div>
    <br></br>
    </li>
    <li style={{color:"white"}}>
    <div style={{color:"white"}}>
    Don't have an account?<button style={{marginLeft:"10px"}} onClick={handleRegister} className='welcome-button'>Register</button> <span></span>click here to Register.
    </div>
    </li>
    </ul>
    <footer>
   <div>
    
   </div>
    </footer>
    
    </div>

    
  );
  }

export default Welcome;