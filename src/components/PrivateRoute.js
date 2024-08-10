// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  console.log('PrivateRoute authState:', authState);

  if (!authState.token) {
    return ;
  }

  return children;
};


export default PrivateRoute;
