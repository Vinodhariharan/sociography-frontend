// src/axiosInstance.js
import axios from 'axios';
import { getToken } from './services/AuthService';

const instance = axios.create({
  baseURL: 'http://3.106.239.84:8080', // Change to your API URL
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
