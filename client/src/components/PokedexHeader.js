import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const PokedexHeader = ({ navigate }) => {

  const handleLogout = () => {
    localStorage.removeItem('userUUID');
    navigate('/login'); 
  };

  return (
    <section className="section pokedex-header d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column align-items-center">
        <img
          className="pokedex-image-text"
          src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
          alt="Pokedex Logo"
        />
        <h1 className="pokedex-header-title">Gen 1 Pokédex</h1>
      </div>
      <Button className="logout-button" variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </section>
  );
};

export default PokedexHeader;