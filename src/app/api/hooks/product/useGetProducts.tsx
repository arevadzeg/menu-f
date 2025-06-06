import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'next/navigation';
import removeFalseyValues from '../../../utils/removeFalseyValues';
import fetchProducts, { GetProductsResponse } from './fetchProducts';

const useGetInfiniteProducts = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { subCategoryId, categoryId, appName } = useParams();

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
      appName,
      subCategoryId,
      categoryId,
    ],
    queryFn: ({ pageParam = 1 }) => fetchProducts(
      appName as string,
      queryString,
      pageParam as number,
    ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.limit);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    enabled: !!appName,
  });
};

export default useGetInfiniteProducts;
