import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetStore } from '../store/useGetStore';
import removeFalseyValues from '../../../utils/removeFalseyValues';
import { Product } from './InterfaceProduct';

interface GetProductsResponse {
  limit: number;
  page: number;
  products: Product[];
  totalCount: number;
}

const fetchProducts = async (
  storeId: string,
  pageParam: number = 1,
  queryString: string,
): Promise<GetProductsResponse> => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.PRODUCT.GET_ALL_BY_STORE}/${storeId}?page=${pageParam}&${queryString}`,
  );
  return response.data;
};

const useGetInfiniteProducts = () => {
  const { data: store } = useGetStore();
  const storeId = store?.id ?? '';
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { subCategoryId, categoryId } = useParams();

  const searchParamsObject = removeFalseyValues({
    search,
    sort,
    order,
    subCategoryId,
    categoryId,
  });

  const queryString = new URLSearchParams(searchParamsObject).toString();

  return useInfiniteQuery<GetProductsResponse, Error>({
    queryKey: [
      'products',
      search,
      sort,
      order,
      storeId,
      subCategoryId,
      categoryId,
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts(storeId, pageParam as number, queryString),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    enabled: !!storeId,
  });
};

export default useGetInfiniteProducts;
