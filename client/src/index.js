import React from 'react';
import ReactDOM from 'react-dom/client';
import PokedexApp from './PokedexApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokedexApp />
  </React.StrictMode>
);

reportWebVitals();
