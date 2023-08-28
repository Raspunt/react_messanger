
import {  Route, Routes  } from 'react-router-dom'

import HomeComponent from './components/homePage';
import LoginComponent from './components/loginPage';


function App() {
  
  


  return (
    <Routes>
        <Route path="/" element={<HomeComponent/>} />
        <Route path="/login" element={<LoginComponent/>} />
        
    </Routes>
  );
}

export default App;
