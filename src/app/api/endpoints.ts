const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register", // User registration
    LOGIN: "/auth/login", // User login
  },
  STORE: {
    CREATE: "/store", // Create a new store
    GET_ALL_BY_USER: "/store/:userId", // Get all stores for a specific user
    GET_STORE_BY_NAME:"store/name"
  },
  PRODUCT: {
    CREATE: "/product",
    GET_ALL_BY_STORE: "/product",
    UPDATE: "/product", 
    DELETE: "/product",
  },
  STORAGE:{
    UPLOAD:"storage/upload"
  }
};

export default API_ENDPOINTS;
