const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register", // User registration
    LOGIN: "/auth/login", // User login
  },
  STORE: {
    CREATE: "/store", // Create a new store
    GET_ALL_BY_USER: "/store", // Get all stores for a specific user
    GET_STORE_BY_NAME: "store/name",
    GET_CATEGORIES: "/store/category",
    CREATE_CATEGORY: "/store/category",
    CREATE_SUB_CATEGORY: "/store/subCategory",
    UPDATE_CATEGORY: "/store/category",
    UPDATE_SUB_CATEGORY: "/store/subCategory",
  },
  PRODUCT: {
    CREATE: "/product",
    GET_ALL_BY_STORE: "/product",
    UPDATE: "/product",
    DELETE: "/product",
  },
  STORAGE: {
    UPLOAD: "storage/upload"
  },
  SCRAPE: {
    GET_SCRAPE_PRODUCT_FROM_ANOTHER_SITE: "scrape/getProductFromAnotherSite"
  }
};

export default API_ENDPOINTS;
