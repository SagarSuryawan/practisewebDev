import { useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './componets/Login';
import Signup from './componets/Signup';
import Privateroutes from './componets/Privateroutes.jsx';
import GetProduct from './componets/GetProduct.jsx';


function App(){

 
  return (
    <BrowserRouter>

    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />

    <Route path="/register" element={<Signup onAuth={() => setIsAuthenticated(true)} />} />

    <Route path="/login" element={<Login onAuth={() => setIsAuthenticated(true)} />} />

    <Route path="/product" element={
  
        <GetProduct />
    }/>

    {/* <Route path="/check" element={<GetProduct/>} /> */}

    </Routes>
    </BrowserRouter>
  )
}

export default App
