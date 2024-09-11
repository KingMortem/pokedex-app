import React from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from './components/Pokedex'; 
import Login from './components/Login'; 

const PokedexApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </Router>
  );
};

export default PokedexApp;