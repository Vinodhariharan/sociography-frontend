// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { authState, initializing } = useAuth();

  // Auth state hasn't been read from localStorage yet - avoid a false
  // "logged out" flash for a user who actually is logged in.
  if (initializing) {
    return null;
  }

  if (!authState.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default PrivateRoute;
