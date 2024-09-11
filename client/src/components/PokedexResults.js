import React , { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Pokemon from './Pokemon';
import ErrorMessage from './ErrorMessage';
import PokedexMessage from './PokedexMessage';
import ModalPokemonDetail from './ModalPokemonDetail';

const PokedexResults = ({ loading, showFavorites, favoritePokemons, 
                          noResults, pokeballImage, getDisplayedPokemons, 
                          handleFavoriteClick, isFavorite, error, onRetry }) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = (pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setSelectedPokemon(null);
        setIsModalOpen(false);
    };
       
    return (
                            
    <section className="section pokedex-results">
    {loading ? (
        <LoadingSpinner />
    ) : error ? (
        <ErrorMessage error={error} onRetry={onRetry} />
    ) : showFavorites && favoritePokemons.length === 0 ? (
        <PokedexMessage 
        imageSrc={pokeballImage} 
        message="You have no favorite Pokémon yet." 
        />
    ) : noResults ? (
        <PokedexMessage 
        imageSrc={pokeballImage} 
        message="No Pokémon was found." 
        />
    ) : (
        <ul className="pokedex-list">
        {getDisplayedPokemons().map(pokemon => (
            <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            handleFavoriteClick={handleFavoriteClick}
            isFavorite={isFavorite}
            onClick={() => handleOpenModal(pokemon)}
            />
        ))}
        </ul>
    )}
    {selectedPokemon && (
    <ModalPokemonDetail pokemon={selectedPokemon} onClose={handleCloseModal}  isOpen={isModalOpen} />
    )}
    </section>
)};

export default PokedexResults;