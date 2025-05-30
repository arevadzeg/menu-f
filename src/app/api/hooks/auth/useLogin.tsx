import { useMutation } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';
import { AxiosResponse } from 'axios';
import { User } from './interfaceUser';

interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: async (loginPayload: LoginPayload) => {
      const response = await apiClient.post<
        AuthResponse,
        AxiosResponse<AuthResponse>
      >(`${API_ENDPOINTS.AUTH.LOGIN}`, loginPayload);
      return response.data;
    },
  });
};
