import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { Product } from './InterfaceProduct';

export interface GetProductsResponse {
  limit: number;
  page: number;
  products: Product[];
  totalCount: number;
}

const fetchProducts = async (
  appName: string,
  queryString: string,
  pageParam: number = 1,
): Promise<GetProductsResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.PRODUCT.GET_ALL_BY_STORE}/${appName}?page=${pageParam}&${queryString}`,
  );
  return response.data;
};

export default fetchProducts;
