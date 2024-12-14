import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { Store } from "./interfaceStore";

interface CreateStorePayload {
  name: string;
  address: string,
  email: string,
  phone: string,
  facebook: string,
  instagram: string,
  userId: string,
}

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation<Store, Error, CreateStorePayload>({
    mutationFn: async (newStore: CreateStorePayload) => {

      const response = await apiClient.post<Store>(
        `${API_ENDPOINTS.STORE.CREATE}`,
        newStore
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
  });
};
