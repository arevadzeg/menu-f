import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { Store } from "./interfaceStore";

interface StorePayload {
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

  return useMutation<Store, Error, StorePayload>({
    mutationFn: async (newStore: StorePayload) => {

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




// TODO API NOT WORKING
export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation<Store, Error, StorePayload>({
    mutationFn: async (newStore: StorePayload) => {

      const response = await apiClient.put<Store>(
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
