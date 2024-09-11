import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Pokemon = ({ pokemon, handleFavoriteClick, isFavorite, onClick }) => {
  return (
    <li key={pokemon.id}>
      <a>
          <img
          src={pokemon.image}
          alt={pokemon.name}
          onClick={() => onClick(pokemon)}
          className="pokemon-thumbnail"
          />
        </a>
      <div className="pokemon-info">
        <h5>
          <FontAwesomeIcon
            data-testid={`favorite-btn-${pokemon.id}`}
            icon={faStar}
            onClick={() => handleFavoriteClick(pokemon.id)}
            // Conditionally apply color to favorite icon just used the easy way, but this is not the best solution
            style={{ color: isFavorite(pokemon.id) ? 'yellow' : 'gray' }}
          />
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h5>
        {pokemon.types.map(type => (
              <img
                // Conditionally apply class since fairy is a special case since fairy type was not included in the first generation
                // of pokemon, so we need to add this condition to apply the class style to it, since the image is a bit different than the rest
                className={type.name === 'fairy' ? 'fairy-type' : 'type-image'} 
                key={type.id}
                src={type.image}
                alt={type.name}
              />
            ))}
      </div>
    </li>
  );
};

export default Pokemon;