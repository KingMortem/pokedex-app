import React from 'react';

const PokedexMessage = ({ imageSrc, message }) => {
  return (
    <p className="message-pokedex-results-container">
      <img src={imageSrc} alt="Pokeball" className="pokeball-image" />
      {message}
    </p>
  );
};

export default PokedexMessage;