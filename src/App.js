
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route,Routes } from 'react-router-dom';
import Home from './Home'

import LoginForm from './LoginForm';

import Welcome from './Welcome';


import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ProfilePage from './ProfilePage';
import Recipe from './Recipe'
import AdminLoginForm from './AdminLoginForm';
import AdminRegi from './AdminRegi';
import AdminPassword from './AdminPassword';
import Home1 from './Home1';
import AdminProfile from './AdminProfile';
import AdminCreate from './AdminCreate';


import AdminList from './AdminList';



import RecipeDetails from "./RecipeDetails"; 
import RecipeEdit from './RecipeEdit';
function App() {
  return (
   
      
    <BrowserRouter>
   
 
    
     
     
   
    <Routes>
    <Route path="/RecDetails/:id" element={<RecipeDetails/>}/>
          
    <Route path="/RecipeEdit/:id" element={<RecipeEdit />}/>
          
      
  
   
    <Route path="/AdminDetails/:id" component={RecipeDetails} />
    <Route path='/AdminCreate' element={<AdminCreate/>}></Route>
    
   
    <Route path='/AdminList' element={<AdminList/>}></Route>

      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/Home1' element={<Home1/>}></Route>
      <Route path='/' element={<Welcome/>}></Route>
      <Route path='/Recipe' element={<Recipe/>}></Route>
      <Route path='/LoginForm' element={<LoginForm/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/AdminPassword' element={<AdminPassword/>}></Route>
      <Route path='/Welcome' element={<Welcome/>}></Route>
     
      <Route path='/LoginForm' element={<LoginForm/>}></Route>
      <Route path='/AdminLoginForm' element={<AdminLoginForm/>}></Route>
      <Route path='/AdminRegi' element={<AdminRegi/>}></Route>

      <Route path='/ProfilePage' element={<ProfilePage/>}></Route>
      <Route path='/AdminProfile' element={<AdminProfile/>}></Route>

     
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;