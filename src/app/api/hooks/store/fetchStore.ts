import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';

const fetchStore = (storeName: string) => apiClient
  .get(`${API_ENDPOINTS.STORE.GET_STORE_BY_NAME}/${storeName}`)
  .then((res) => res.data);

export default fetchStore;
