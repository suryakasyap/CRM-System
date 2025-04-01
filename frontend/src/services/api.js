import axios from 'axios';

// Explicitly set the full API URL including the protocol and port
const API_URL = 'http://localhost:8080/api';

console.log('Using API URL:', API_URL);

// Create axios instance with more forgiving timeout and better error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Change to false to prevent CORS issues with credentials
  timeout: 15000, // Increase timeout for potentially slow connections
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Log outgoing requests in development
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    // More detailed error logging
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      // Use navigate when possible, but fallback to window.location for interceptors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export direct access to authenticate without token
export const directAuthenticate = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/status');
    return await response.json();
  } catch (error) {
    console.error('Direct fetch authentication error:', error);
    throw error;
  }
};

export default api; 