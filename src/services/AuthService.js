// src/services/AuthService.js
import axios from 'axios';
const baseUrl = import.meta.env.  REACT_APP_API_BASE_URL; // Fallback to localhost if env variable is not set

const API_URL = '/api/auth/login';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, null, {
      params: { username, password },
    });
    const token = response.data; // Assuming the token is returned directly
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
  };

  