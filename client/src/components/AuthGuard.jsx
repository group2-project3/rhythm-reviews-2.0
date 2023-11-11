// AuthGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ element, loggedIn }) => {
  return loggedIn ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default AuthGuard;