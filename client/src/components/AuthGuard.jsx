// AuthGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// AuthGuard Component-Renders the provided element if the user is logged in, else redirects to the login page.
const AuthGuard = ({ element, loggedIn }) => {
  return loggedIn ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default AuthGuard;