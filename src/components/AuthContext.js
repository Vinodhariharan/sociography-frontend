// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

// Function to fetch authState from localStorage
export const fetchAuthStateFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const mode = localStorage.getItem('mode') || 'guest';
  const photographerId = localStorage.getItem('photographerId');

  return { token, email, mode, photographerId };
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    email: null,
    mode: 'guest', // default mode
    photographerId: null, // Added photographerId to state
  });

  useEffect(() => {
    const storedAuthState = fetchAuthStateFromLocalStorage();
    setAuthState(storedAuthState);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', null, {
        params: {
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const token = response.data;

      // Decode the JWT to extract user information
      const decoded = jwtDecode(token);
      const mode = decoded.role; // Assuming 'role' is stored in the token
      const photographerId = decoded.id; // Extract photographerId from the token

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('mode', mode);
      localStorage.setItem('photographerId', photographerId); // Store photographerId in local storage
      setAuthState({ token, email, mode, photographerId });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const signup = () => {
    const storedAuthState = fetchAuthStateFromLocalStorage();
    setAuthState(storedAuthState);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('mode');
    localStorage.removeItem('photographerId'); // Remove photographerId from local storage
    setAuthState({ token: null, email: null, mode: 'guest', photographerId: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
