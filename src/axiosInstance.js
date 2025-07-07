// src/axiosInstance.js
import axios from 'axios';
import { getToken } from './services/AuthService';

const instance = axios.create({
  baseURL: 'https://sociography-bend-gxfqbzbxhnghg2hz.southeastasia-01.azurewebsites.net', // Change to your API URL
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
