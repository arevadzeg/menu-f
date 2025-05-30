import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { useGetStore } from "../store/useGetStore";
import { Category, SubCategory } from "./interfaceCategory";

// CREATE CATEGORY
interface CreateCategoryPayload {
  categoryName: string;
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { data: store } = useGetStore();
  const storeId = store?.id ?? "";

  return useMutation<Category, Error, CreateCategoryPayload>({
    mutationFn: async (newCategory: CreateCategoryPayload) => {
      const response = await apiClient.post<Category>(
        `${API_ENDPOINTS.STORE.CREATE_CATEGORY}/${storeId}`,
        { categoryName: newCategory.categoryName },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// CREATE SUB-CATEGORY
interface CreateSubCategoryPayload {
  subCategoryName: string;
  categoryId: string;
}

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<SubCategory, Error, CreateSubCategoryPayload>({
    mutationFn: async (newCategory: CreateSubCategoryPayload) => {
      const response = await apiClient.post<SubCategory>(
        `${API_ENDPOINTS.STORE.CREATE_SUB_CATEGORY}/${newCategory.categoryId}`,
        { subCategoryName: newCategory.subCategoryName },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// UPDATE CATEGORY
interface UpdateCategoryPayload {
  categoryId: string;
  categoryName: string;
}
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, UpdateCategoryPayload>({
    mutationFn: async (updatedCategory: UpdateCategoryPayload) => {
      const response = await apiClient.put<Category>(
        `${API_ENDPOINTS.STORE.UPDATE_CATEGORY}/${updatedCategory.categoryId}`,
        { categoryName: updatedCategory.categoryName },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// UPDATE SUB-CATEGORY
interface UpdateSubCategoryPayload {
  subCategoryId: string;
  subCategoryName: string;
}
export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<SubCategory, Error, UpdateSubCategoryPayload>({
    mutationFn: async (updatedSubCategory: UpdateSubCategoryPayload) => {
      const response = await apiClient.put<SubCategory>(
        `${API_ENDPOINTS.STORE.UPDATE_SUB_CATEGORY}/${updatedSubCategory.subCategoryId}`,
        { subCategoryName: updatedSubCategory.subCategoryName },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// DELETE SUB CATEGORY
// UPDATE CATEGORY
interface DeleteCategoryPayload {
  categoryId: string;
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, DeleteCategoryPayload>({
    mutationFn: async (updatedCategory: DeleteCategoryPayload) => {
      const response = await apiClient.delete<Category>(
        `${API_ENDPOINTS.STORE.DELETE_CATEGORY}/${updatedCategory.categoryId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, DeleteCategoryPayload>({
    mutationFn: async (updatedCategory: DeleteCategoryPayload) => {
      const response = await apiClient.delete<Category>(
        `${API_ENDPOINTS.STORE.DELETE_SUB_CATEGORY}/${updatedCategory.categoryId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
