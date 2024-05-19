import axios from 'axios';
import { getLocalStorage } from '@utils';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const headers = getLocalStorage('Headers');

    if (headers) {
      config.headers['access-token'] = headers['access-token'];
      config.headers['client'] = headers['client'];
      config.headers['expiry'] = headers['expiry'];
      config.headers['Authorization'] = headers['authorization'];
      config.headers['uid'] = headers['uid'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
