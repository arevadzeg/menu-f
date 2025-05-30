import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { useGetStore } from '../store/useGetStore';
import { Category } from './interfaceCategory';

const useGetCategories = () => {
  const { data: store } = useGetStore();
  const storeId = store?.id ?? '';

  return useQuery<Category[], Error>({
    queryKey: ['category'],
    queryFn: () => {
      return apiClient
        .get(`${API_ENDPOINTS.STORE.GET_CATEGORIES}/${storeId}`)
        .then((res) => res.data);
    },
    enabled: !!storeId,
  });
};

export default useGetCategories;
