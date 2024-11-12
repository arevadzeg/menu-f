import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";

interface Store {
  id: string;
  userId: string;
  name: string;
  image: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  facebook: string | null;
  instagram: string | null;
  createdAt: string;
  updatedAt: string;
}

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
