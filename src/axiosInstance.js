// src/axiosInstance.js
import axios from 'axios';
import { getToken } from './services/AuthService';

// Set REACT_APP_API_URL in the environment (e.g. Vercel project settings)
// to point at the deployed backend. CRA only embeds env vars prefixed with
// REACT_APP_, and only at build time - changing it requires a rebuild/redeploy.
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

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