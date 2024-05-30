import axios from "axios";
import { getLocalStorage } from "@utils";

export const baseURL = 'http://127.0.0.1:3000';

// Create apiClient instance for JSON requests
export const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for apiClient
apiClient.interceptors.request.use(
  (config) => {
    const headers = getLocalStorage("Headers");

    if (headers) {
      config.headers["access-token"] = headers["access-token"];
      config.headers["client"] = headers["client"];
      config.headers["expiry"] = headers["expiry"];
      config.headers["Authorization"] = headers["authorization"];
      config.headers["uid"] = headers["uid"];
    }

    console.log('apiClient headers:', headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for apiClient
apiClient.interceptors.response.use(
  (response) => {
    console.log("apiClient Response:", response);
    return response;
  },
  (error) => {
    console.error("apiClient Error Response:", error.response);
    return Promise.reject(error);
  }
);

// Create apiClientFormData instance for FormData requests
export const apiClientFormData = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor for apiClientFormData
apiClientFormData.interceptors.request.use(
  (config) => {
    const headers = getLocalStorage('Headers');

    if (headers) {
      config.headers['access-token'] = headers['access-token'];
      config.headers['client'] = headers['client'];
      config.headers['expiry'] = headers['expiry'];
      config.headers['Authorization'] = headers['authorization'];
      config.headers['uid'] = headers['uid'];
    }

    console.log('apiClient headers:', headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for apiClientFormData
apiClientFormData.interceptors.response.use(
  (response) => {
    console.log('apiClientFormData Response:', response);
    return response;
  },
  (error) => {
    console.error('apiClientFormData Error Response:', error.response);
    return Promise.reject(error);
  }
);
