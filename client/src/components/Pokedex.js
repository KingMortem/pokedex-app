import React, { useEffect, useState } from 'react';
import '../styles/pokedex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import pokeballImage from '../assets/pokeball.png';
import { useNavigate } from 'react-router-dom';

// Components
import PokedexHeader from './PokedexHeader';
import PokedexFilter from './PokedexFilter';
import PokedexResults from './PokedexResults';



const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const userId = localStorage.getItem('userUUID');
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate(); // Declaring this here so we can use it in the PokedexHeader component

   const handleSearch = (results) => {
    if (results.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredPokemons(results);
  };

  const handleFavoriteClick = (pokemonId) => {
    const isAlreadyFavorite = favoritePokemons.includes(pokemonId);
    let updatedFavorites;
  
    if (isAlreadyFavorite) {
      updatedFavorites = favoritePokemons.filter((id) => id !== pokemonId);
    } else {
      updatedFavorites = [...favoritePokemons, pokemonId];
    }
  
    setFavoritePokemons(updatedFavorites);
    localStorage.setItem(`${userId}-favorite-pokemons`, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (pokemonId) => {
    return favoritePokemons.includes(pokemonId);
  };

  const getDisplayedPokemons = () => {
    if (showFavorites) {
      return pokemons.filter(pokemon => isFavorite(pokemon.id));
    }
    return filteredPokemons.length > 0 ? filteredPokemons : pokemons;
  };

  const fetchPokemons = async () => {
    setLoading(true);
    setError(null); 
    setNoResults(false);
    try {
      const response = await fetch('/api/pokemon',{
        headers: {
          'user-uuid': userId
        }
      });
      if (!response.ok) {
        throw new Error('Error while fetching pokemons');
      }
      const data = await response.json();
      setPokemons(data);
      setNoResults(data.length === 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    const storedFavoritePokemons = localStorage.getItem(`${userId}-favorite-pokemons`);
    if (storedFavoritePokemons) {
      setFavoritePokemons(JSON.parse(storedFavoritePokemons));
    }
  }, [userId]);

  return (
    <div className="pokedex-app-container">
      <PokedexHeader navigate={navigate}/>
      <PokedexFilter
        pokemons={pokemons}
        handleSearch={handleSearch}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
  <PokedexResults
        loading={loading}
        showFavorites={showFavorites}
        favoritePokemons={favoritePokemons}
        noResults={noResults}
        pokeballImage={pokeballImage}
        getDisplayedPokemons={getDisplayedPokemons}
        handleFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
        error={error}
        onRetry={fetchPokemons}
      />
    </div>
  );
};

export default Pokedex;