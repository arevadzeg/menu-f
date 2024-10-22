import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";
import useGetStore from "./useGetStore";

interface CreateCategoryPayload {
  categoryName: string;
}
interface CreateSubCategoryPayload {
  subCategoryName: string;
  categoryId: string;
}

interface UpdateCategoryPayload {
  categoryId: string;
  categoryName: string;
}

interface UpdateSubCategoryPayload {
  subCategoryId: string;
  subCategoryName: string;
}

interface Category {
  id: string;
  storeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { data: store } = useGetStore();
  const storeId = store?.id ?? "";

  return useMutation<Category, Error, CreateCategoryPayload>({
    mutationFn: async (newCategory: CreateCategoryPayload) => {
      const response = await apiClient.post<Category>(
        `${API_ENDPOINTS.STORE.CREATE_CATEGORY}/${storeId}`,
        { categoryName: newCategory.categoryName }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, CreateSubCategoryPayload>({
    mutationFn: async (newCategory: CreateSubCategoryPayload) => {
      console.log("newCategory", newCategory);
      const response = await apiClient.post<Category>(
        `${API_ENDPOINTS.STORE.CREATE_SUB_CATEGORY}/${newCategory.categoryId}`,
        { subCategoryName: newCategory.subCategoryName }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, UpdateCategoryPayload>({
    mutationFn: async (updatedCategory: UpdateCategoryPayload) => {
      const response = await apiClient.put<Category>(
        `${API_ENDPOINTS.STORE.UPDATE_CATEGORY}/${updatedCategory.categoryId}`,
        { categoryName: updatedCategory.categoryName }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, UpdateSubCategoryPayload>({
    mutationFn: async (updatedSubCategory: UpdateSubCategoryPayload) => {
      const response = await apiClient.put<Category>(
        `${API_ENDPOINTS.STORE.UPDATE_SUB_CATEGORY}/${updatedSubCategory.subCategoryId}`,
        { subCategoryName: updatedSubCategory.subCategoryName }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
