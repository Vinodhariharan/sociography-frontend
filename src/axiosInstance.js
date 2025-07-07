// src/axiosInstance.js
import axios from 'axios';
import { getToken } from './services/AuthService';
const baseUrl = process.env.VITE_API_BASE_URL; // Fallback to localhost if env variable is not set

const instance = axios.create({
  baseURL: baseUrl, // Change to your API URL
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
