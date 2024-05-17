import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // || process.env.REACT_APP_API_URL (if dotenv file is available)
  headers: {
    'Content-Type': 'application/json',
  }
});