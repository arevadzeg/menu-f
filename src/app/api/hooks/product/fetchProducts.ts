import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { GetProductsResponse } from './useGetProducts';

const fetchProducts = async (
  storeId: string,
  queryString: string,
  pageParam: number = 1,
): Promise<GetProductsResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.PRODUCT.GET_ALL_BY_STORE}/${storeId}?page=${pageParam}&${queryString}`,
  );
  return response.data;
};

export default fetchProducts;
