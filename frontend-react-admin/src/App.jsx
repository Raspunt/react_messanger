import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import  AdminComponent from "./components/AdminPage"

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AdminComponent />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
 