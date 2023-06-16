import React from 'react';
import '../styles/RegistrationRequired.css';

const RegistrationRequired = () => {
  return (
    <div className="message">
      <h2>Registration Required</h2>
      <p>You need to be registered to access this page.</p>
      <a href="/">Sign Up</a>
    </div>
  );
};
export default RegistrationRequired;

