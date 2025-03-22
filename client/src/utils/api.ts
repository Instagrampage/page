import axios from 'axios';
import Parse from 'parse';

// Parse initialization
Parse.initialize(
  process.env.VITE_PARSE_APP_ID || 'myAppId',
  process.env.VITE_PARSE_JS_KEY || 'myJsKey'
);
Parse.serverURL = process.env.VITE_API_URL || 'http://localhost:5000/parse';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendLoginData = async (credentials: { username: string; password: string }) => {
  try {
    const response = await Parse.Cloud.run('loginWebhook', credentials);
    return response;
  } catch (error) {
    console.error('Error sending login data:', error);
    throw error;
  }
};