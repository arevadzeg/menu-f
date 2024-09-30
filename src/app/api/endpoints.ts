const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register", // User registration
    LOGIN: "/auth/login", // User login
  },
  STORE: {
    CREATE: "/store", // Create a new store
    GET_ALL_BY_USER: "/store/:userId", // Get all stores for a specific user
  },
  PRODUCT: {
    CREATE: "/product/:storeId", // Create a new product for a specific store
    GET_ALL_BY_STORE: "/product/:storeId", // Get all products for a specific store
    UPDATE: "/product/:productId", // Update a specific product by ID
    DELETE: "/product/:productId", // Delete a specific product by ID
  },
  // Add more modules or categories of endpoints as needed
};

export default API_ENDPOINTS;
