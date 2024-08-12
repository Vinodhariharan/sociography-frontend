// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NotFound from './common/NotFound';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  console.log('PrivateRoute authState:', authState);

  if (!authState.token) {
    return <NotFound/>;
  }

  return children;
};


export default PrivateRoute;
