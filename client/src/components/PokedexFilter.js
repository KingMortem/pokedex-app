import React from 'react';
import Button from 'react-bootstrap/Button';
import SearchBar from './SearchBar';

const PokedexFilter = ({ pokemons, handleSearch, showFavorites, setShowFavorites }) => (
    <section className="pokedex-filter-section">
      <SearchBar
        placeholder="Search for a Pokémon..."
        data={pokemons}
        onSearch={handleSearch}
      />
      <Button data-testid="show-favorites" className='show-favorites' variant="dark" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Show all' : 'Show favorites'}
      </Button>
    </section>
  );

  export default PokedexFilter;