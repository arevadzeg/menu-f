import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProductClientPage from './ProductClientPage';
import fetchProducts from '../api/hooks/product/fetchProducts';

export default async function Page({ searchParams, params }: any) {
  const queryClient = new QueryClient();

  const storeId = 'some-store-id'; // You must fetch this server-side if `useGetStore` is client-side only
  const search = searchParams.search || '';
  const sort = searchParams.sort || '';
  const order = searchParams.order || '';
  const subCategoryId = params.subCategoryId || '';
  const categoryId = params.categoryId || '';

  const searchParamsObject = {
    search,
    sort,
    order,
    subCategoryId,
    categoryId,
  };

  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(searchParamsObject).filter(([, v]) => Boolean(v)),
    ),
  ).toString();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      'products',
      search,
      sort,
      order,
      storeId,
      subCategoryId,
      categoryId,
    ],
    queryFn: ({ pageParam = 1 }) => fetchProducts(storeId, queryString, pageParam),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>asd</div>
      <ProductClientPage />
    </HydrationBoundary>
  );
}
