import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import fetchProducts from '../api/hooks/product/fetchProducts';
import fetchStore from '../api/hooks/store/fetchStore';
import fetchCategories from '../api/hooks/category/fetchCategories';
import Header from '../components/layout/Header/Header';
import LayoutDnDWrapper from '../LayoutDnDWrapper';
import Footer from '../components/layout/Footer/Footer';

const queryClient = new QueryClient();

export default async function PrefetchComponent({
  children,
  searchParams,
  params,
}: any) {
  const search = searchParams.search || '';
  const sort = searchParams.sort || '';
  const order = searchParams.order || '';
  const subCategoryId = params.subCategoryId || null;
  const categoryId = params.categoryId || null;
  const appName = params.appName || '';

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
      appName,
      subCategoryId,
      categoryId,
    ],
    queryFn: ({ pageParam = 1 }) => fetchProducts(appName, queryString, pageParam),
    initialPageParam: 1,
    staleTime: Infinity,
  });

  await queryClient.prefetchQuery({
    queryKey: ['store', appName],
    queryFn: () => fetchStore(appName),
    staleTime: Infinity,
  });

  await queryClient.prefetchQuery({
    queryKey: ['category', appName],
    queryFn: () => fetchCategories(appName),
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <LayoutDnDWrapper>{children}</LayoutDnDWrapper>
      <Footer />
    </HydrationBoundary>
  );
}
