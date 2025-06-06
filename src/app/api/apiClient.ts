import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptors
apiClient.interceptors.request.use(
  (config) => {
    const isClient = typeof window !== 'undefined';

    if (isClient) {
      const token = localStorage.getItem('token');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response ? error.response.data : error.message),
);

export default apiClient;
