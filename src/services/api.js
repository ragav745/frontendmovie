import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://serverbackend-o03k.onrender.com/api').replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
