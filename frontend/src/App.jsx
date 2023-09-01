import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HomeComponent from './components/homePage';
import LoginComponent from './components/loginPage';


function App() {

  const navigate = useNavigate();
  useEffect(() => {

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem("token")


    axios.post(`${serverUrl}/user/AuthToken/`,{
        'token':token
    })
        .then((res) => {
            
            const {user,status} = res.data


            if (!status){
                navigate('/Login');
            }
            
           


        })
        .catch((res) => {

            if (res.request.status == 401){
              navigate('/Login');
            }


        })
    
  }, [navigate]);




    

  
  


  return (
    <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/login" element={<LoginComponent/>} />
        
    </Routes>
  );
}

export default App;
