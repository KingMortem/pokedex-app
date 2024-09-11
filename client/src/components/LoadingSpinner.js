import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => (
    <div className="loading-container">
      <Spinner animation="border" variant="danger" size="lg" />
      <p>Loading...</p>
    </div>
  );

export default LoadingSpinner;