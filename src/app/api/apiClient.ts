// apiClient.ts
"use client"; // Add this line

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptors
apiClient.interceptors.request.use(
  (config) => {
    // You can add token or modify the request here
    const token = localStorage.getItem("token"); // Example for adding a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptors
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return only the data from the response
  },
  (error) => {
    // Handle errors here (e.g., logging, showing notifications)
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default apiClient;
