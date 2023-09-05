import { Route, Routes, useNavigate } from 'react-router-dom';
import React, {useEffect,useState } from 'react';

import axios from 'axios';

import HomeComponent from './components/homePage';
import LoginComponent from './components/loginPage';



function App() {

  const navigate = useNavigate();



  useEffect(() => {

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem("token")

    const pathname = window.location.pathname;

    if (pathname === "/Login"){
      return
    }

    axios.post(`${serverUrl}/user/AuthToken/`,{
        'token':token
    },{withCredentials:true})
        .then((res) => {
            
        })
        .catch((res) => {

          if (res.request.status === 401){
            navigate('/Login');
          }
        })
    
  }, [navigate]);




    

  
  


  return (
    <Routes>
        <Route path="/" element={
        <HomeComponent/>
        
        } />
        <Route path="/login" element={<LoginComponent/>} />
        
    </Routes>
  );
}

export default App;
