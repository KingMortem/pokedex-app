import React from 'react';
import Button from 'react-bootstrap/Button';

const ErrorMessage = ({ error, onRetry }) => (
    // Error message component just to display error messages from the server if anything goes wrong
  <div className="error-message">
    <p>Something went wrong: {error}</p>
    <Button variant="danger" onClick={onRetry}>
      Retry
    </Button>
  </div>
);

export default ErrorMessage;