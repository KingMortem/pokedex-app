import React, { useState } from 'react';
import '../styles/pokedex.css';

const SearchBar = ({ placeholder, data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredData = data.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value)
    );

    onSearch(filteredData);
  };

  return (
      <div className="search-bar-div">
        <input
          className="search-bar-input"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
  );
};

export default SearchBar;
