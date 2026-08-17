// src/services/AuthService.js
export const getToken = () => {
  return localStorage.getItem('token');
};
