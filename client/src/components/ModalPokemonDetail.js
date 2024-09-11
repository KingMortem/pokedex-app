  import React from 'react';
  import '../styles/modalPokemonDetail.css';

  const ModalPokemonDetail = ({ isOpen, pokemon, onClose }) => {
    if (!pokemon) return null; 
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose} className="modal-close-button">×</button>
          <h5>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
          <div className="pokemon-images">
            <div className="pokemon-image-wrapper" key={pokemon.id}>
              <span className="image-label">Normal</span>
              <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
            </div>
            {pokemon?.shinyImage && (
              <div className="pokemon-image-wrapper" key={`${pokemon.id}-shiny`}>
                <span className="image-label">Shiny</span>
                <img src={pokemon.shinyImage} alt={pokemon.name} className="pokemon-image-shiny" />
              </div>
            )}
          </div>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <img
                key={type.id}
                className={type.name === 'fairy' ? 'fairy-type' : 'type-image'}
                src={type.image}
                alt={type.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default ModalPokemonDetail;