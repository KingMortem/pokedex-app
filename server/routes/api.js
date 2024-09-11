const express = require('express');
const router = express.Router();
const axios = require('axios');
const typeImageMap = require('../utils/typeImageMap');



let users = {}; // Temporary storage for users

router.post('/authenticate', async (req, res) => {
  const { userId } = req.body;

  // Check if user exists, otherwise create a new user
  if (!users[userId]) {
    users[userId] = { userId, authenticated: true }; // Store user in memory
  }

  res.json({ message: 'User authenticated', user: users[userId] });
});

const authenticateRequest = async (req, res, next) => {
  const userId = req.headers['user-uuid'] || req.query.userId;
  if (!users[userId] || !users[userId].authenticated) {
    return res.status(401).json({ error: 'Missing user UUID' });
  }
  req.userId = userId;
  next();
};

// Fetch all pokemon from gen 1 of the PokéAPI (151 pokemons)
router.get('/pokemon', authenticateRequest, async (req, res) => {
    try {
      userId = req.userId;
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

      const gen1PokemonList = await response.data.results;
      validatePokemonList(gen1PokemonList);

      // Fetch details for each pokemon
      const pokemonDetails = await Promise.all(
        gen1PokemonList.map(async (pokemon) => {
          return await getPokemonDetails(pokemon);
        })
      );

       // Send the fetched data as JSON response
      res.json(pokemonDetails);

    } catch (error) {
      // Log the error and send a 500 response to the client
      console.error("Error while fetching data from PokéAPI:", error.message);
      res.status(500).json({ error: "Failed to fetch Pokémon data" });
    }
  });

// Helper method to fetch individual Pokémon details
const getPokemonDetails = async (pokemon) => {
  try {

    // Check if the pokemon has a URL
    if(!pokemon || !pokemon.url) {
      throw new Error('Invalid pokemon');
    }

    const pokemonDataResponse = await axios.get(pokemon.url);
    
    if (!pokemonDataResponse.data || !pokemonDataResponse.data.types) {
      throw new Error('Invalid pokemon data');
    }
    // Get type images from the map
    const typesWithImages = getTypesWithImages(pokemonDataResponse.data.types);

      // Return the fetched data
    return {
      name: pokemon.name,
      image: pokemonDataResponse.data.sprites.front_default,
      shinyImage: pokemonDataResponse.data.sprites.front_shiny,
      types: typesWithImages,
      id: pokemonDataResponse.data.id,
    };

  } catch (error) {
      // Log the error and send a 500 response to the client
      console.error("Error while fetching pokemon details from PokéAPI:", error.message);
      res.status(500).json({ error: "Failed to fetch pokemon details" });
  }
};

const getTypesWithImages = (types) => {
  return types.map(typeInfo => {
    const typeName = typeInfo.type.name;
    return {
      name: typeName,
      image: typeImageMap[typeName], // Get type image from the map
    };
  });
};

// Helper method to validate the response from the PokéAPI and some aspects of the response data
const validatePokemonList = (pokemonList) => {
  if (!Array.isArray(pokemonList)) {
    throw new Error('Invalid Pokémon list response');
  }

  if (pokemonList.length === 0) {
    throw new Error('Pokémon list is empty');
  }

  return pokemonList.every((pokemon) => {
    if (!pokemon.url) {
      throw new Error('Pokémon object is missing URL property');
    }

    if (typeof pokemon.url !== 'string' || !pokemon.url.startsWith('https://')) {
      throw new Error('Invalid Pokémon URL');
    }

    if (!pokemon.name) {
      throw new Error('Pokémon object is missing name property');
    }

    if (typeof pokemon.name !== 'string' || pokemon.name.length === 0) {
      throw new Error('Invalid Pokémon name');
    }

    return true;
  });
};

module.exports = router;