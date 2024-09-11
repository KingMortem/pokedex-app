import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pokedex from './Pokedex'; 
import { BrowserRouter } from 'react-router-dom';

// I would have loved to take more time to invest on testing but I was trying just to do some of them this is a general idea
// I am no expert in testing either but I would like to practice more about this, it took me way longer than I expected
describe('Pokedex Component', () => {

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    fetch.resetMocks(); 
    localStorage.clear(); 
  });
    
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('renders loading state initially', () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    renderWithRouter(<Pokedex />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  //Test for fetching
  test('renders fetched Pokémon data', async () => {
    const mockPokemons = [
      { id: 93, name: 'Haunter', types: [{ type: { name: 'ghost' } }] },
      { id: 94, name: 'Gengar', types: [{ type: { name: 'ghost' } }] }
    ];
  
    fetch.mockResponseOnce(JSON.stringify(mockPokemons));
  
    renderWithRouter(<Pokedex />);
  
    await waitFor(() => {
      expect(screen.getByText('Haunter')).toBeInTheDocument();
      expect(screen.getByText('Gengar')).toBeInTheDocument();
    });
  });

  test('displays an error message when the fetch fails', async () => {
    fetch.mockReject(() => Promise.reject(new Error('Something went wrong')));
  
    renderWithRouter(<Pokedex />);
  
    // Wait for the error message to appear
    await waitFor(() => {
      // Use a regular expression or a function for more flexibility
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  
    // Optionally verify the structure of the error message component
    const errorDiv = screen.getByText(/Something went wrong/i).closest('div');
    expect(errorDiv).toHaveClass('error-message');
  });

  test('displays no results message when search returns no Pokémon', async () => {
    const mockPokemons = [
      { id: 1, name: 'Bulbasaur', types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }] }
    ];
    fetch.mockResponseOnce(JSON.stringify(mockPokemons));
  
    renderWithRouter(<Pokedex />);
  
    // Wait for Pokémon data to appear
    await waitFor(() => screen.getByText('Bulbasaur'));
  
    // Simulate search with no results
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Pikachu' } });
  
    // Check for no results message
    expect(screen.getByText(/No Pokémon was found/i)).toBeInTheDocument();
  });

  // This one was not easy to accomplish, It really took me some time to figure how to do this test
  test('toggles favorite Pokémon correctly', async () => {
    const mockPokemons = [
      { id: 93, name: 'Haunter', types: [{ type: { name: 'ghost' } }] },
      { id: 94, name: 'Gengar', types: [{ type: { name: 'ghost' } }] }
    ];
    fetch.mockResponseOnce(JSON.stringify(mockPokemons));
  
    renderWithRouter(<Pokedex />);
  
    await waitFor(() => {
      expect(screen.getByText('Haunter')).toBeInTheDocument();
    });
  
    // Simulate clicking favorite for Haunter
    const favoriteButton = screen.getByTestId('favorite-btn-93'); 
    fireEvent.click(favoriteButton);
  
    expect(Storage.prototype.setItem).toHaveBeenCalled();
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      expect.any(String), 
      JSON.stringify([93])
    );
  
    const toggleFavoritesButton = screen.getByTestId('show-favorites'); 
    fireEvent.click(toggleFavoritesButton);

    await waitFor(() => {
      expect(screen.getByText('Haunter')).toBeInTheDocument();
      expect(screen.queryByText('Gengar')).toBeNull();
    });
  });

});