import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';

const fetchCategories = async (storeId: string) => apiClient
  .get(`${API_ENDPOINTS.STORE.GET_CATEGORIES}/${storeId}`)
  .then((res) => res.data);

export default fetchCategories;
