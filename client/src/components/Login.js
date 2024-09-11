import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import logo from '../assets/Pokedex_logo.svg';
import Button from 'react-bootstrap/Button';

const AuthenticateUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const handleLoginClick = async () => {
    let currentUserId = userId;

    // Generate a new UUID if no userId exists
    if (!currentUserId) {
      currentUserId = uuidv4();
      setUserId(currentUserId);
      localStorage.setItem('userUUID', currentUserId);
    }

    try {
      const response = await axios.post('/api/authenticate', { userId: currentUserId });
      if (response.data.message === 'User authenticated') {
        navigate('/pokedex');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
    }
  };

  return (
    <div className="pokedex-app-container">
        <div className='login-container'>
          <h1 className="pokedex-app-title">Welcome to the Pokédex App</h1>
          <img
            className='pokedex-logo'
            src={logo}
            alt="Pokedex Logo"
          />
          <Button variant="danger" size="lg" className="login-button" onClick={handleLoginClick}>Login</Button>
        </div>
    </div>
  );
};

export default AuthenticateUser;