import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendLoginData = async (credentials: { username: string; password: string }) => {
  try {
    const response = await api.post('/api/webhook', credentials);
    return response.data;
  } catch (error) {
    console.error('Error sending login data:', error);
    throw error;
  }
};
