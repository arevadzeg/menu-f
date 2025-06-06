import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Category } from './interfaceCategory';
import fetchCategories from './fetchCategories';

const useGetCategories = () => {
  const { appName } = useParams();

  return useQuery<Category[], Error>({
    queryKey: ['category', appName],
    queryFn: () => fetchCategories(appName as string),
    enabled: !!appName,
  });
};

export default useGetCategories;
