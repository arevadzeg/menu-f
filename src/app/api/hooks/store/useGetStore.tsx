import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAtom } from 'jotai';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { authAtom } from '../../../atom/authAtom';
import { Store } from './interfaceStore';

export const useGetStore = () => {
  const params = useParams();
  const name = params.appName;

  return useQuery<Store, Error>({
    queryKey: ['store', name],
    queryFn: () => apiClient
      .get(`${API_ENDPOINTS.STORE.GET_STORE_BY_NAME}/${name}`)
      .then((res) => res.data),
    enabled: !!name,
  });
};

export const useGetUserStores = () => {
  const [user] = useAtom(authAtom);

  return useQuery<Store[], Error>({
    queryKey: ['store', user?.user.id],
    queryFn: () => apiClient
      .get(`${API_ENDPOINTS.STORE.GET_ALL_BY_USER}/${user?.user.id}`)
      .then((res) => res.data),
    enabled: !!user,
  });
};
