# Project Overview
This is a full-stack project that includes a client-side application built with React and a server-side API built with Node.js and Express. This is a Gen 1 only pokedex app!

## Features
* Login with UUID: Securely log in to the app using a unique identifier (UUID).
* Filter by Name: Filter the Pokémon list by name to quickly find the Pokémon you're looking for.
* Add to Favorites: Add your favorite Pokémon to a special list for easy access.
* Filter by Favorites: Filter the Pokémon list to only show your favorite Pokémon.
* Modal with Details: View information about each Pokémon in a modal window, including their normal form and shiny form and types.
* API Integration: The app has an API built with Node.js and Express, as seen in the server\routes\api.js file. This suggests that the app retrieves data from the API to display information about Pokémon.
* Test: Included a little bit of testing

## Getting Started

## Prerequisites
Before you start, make sure you have the following installed on your machine:

* Node.js (version 14 or higher)
* npm (version 6 or higher)
* Git
* A code editor or IDE of your choice

### Client
* Navigate to the `client` directory: `cd client`
* Install dependencies: `npm install`
* Start the client: `npm start`

### Server
* Navigate to the `server` directory: `cd server`
* Install dependencies: `npm install`
* Start the server: `npm start`

### Running Both
* To run both the client and server simultaneously, use the following command from the root directory: `npm run start:all`

## Scripts
* `start`: Starts the client or server
* `start:all`: Starts both the client and server simultaneously
* `build`: Builds the client-side application
* `test`: Runs tests for the client or server

## Dependencies
### Client
* React
* Webpack

### Server
* Node.js
* Express

## Folder Structure
* `client`: Client-side application code
* `server`: Server-side API code

## Acknowledgments
Thanks to Daniel Ballesteros for creating this project!