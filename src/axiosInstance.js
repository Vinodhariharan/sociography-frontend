// src/axiosInstance.js
import axios from 'axios';
import { getToken } from './services/AuthService';

const baseUrl = "https://sociography-bend-gxfqbzbxhnghg2hz.southeastasia-01.azurewebsites.net";
console.log('Base URL:', baseUrl);

const instance = axios.create({
  baseURL: baseUrl,
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