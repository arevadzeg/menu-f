import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { Store } from "./interfaceStore";

interface CreateCategoryPayload {
  name: string;
  userId: string;
}

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation<Store, Error, CreateCategoryPayload>({
    mutationFn: async (newCategory: CreateCategoryPayload) => {
      const response = await apiClient.post<Store>(
        `${API_ENDPOINTS.STORE.CREATE}`,
        { name: newCategory.name, userId: newCategory.userId }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
