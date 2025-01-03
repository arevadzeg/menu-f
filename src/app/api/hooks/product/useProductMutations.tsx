"use client";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { AxiosResponse } from "axios";
import removeFalseyValues from "../../../utils/removeFalseyValues";
import { useParams } from "next/navigation";
import { Product } from "./InterfaceProduct";
import { useGetStore } from "../store/useGetStore";

interface CreateProductPayload {
  title: string;
  price: number;
  isOnSale?: boolean;
  image: string;
  description?: string;
}

interface UpdateProductPayload extends Partial<CreateProductPayload> {
  productId?: string;
  categoryId?: string;
  subCategoryId?: string;
}


// CREATE PRODUCT
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { subCategoryId, categoryId } = useParams();
  const { data: store } = useGetStore();
  const storeId = store?.id ?? "";

  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: async (newProduct: CreateProductPayload) => {
      const response = await apiClient.post<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.CREATE}/${storeId}`,
        removeFalseyValues({ ...newProduct, subCategoryId, categoryId })
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
};

// UPDATE PRODUCT
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, UpdateProductPayload>({
    mutationFn: async (product: UpdateProductPayload) => {
      const response = await apiClient.put<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.UPDATE}/${product.productId}`,
        removeFalseyValues(product)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to update product:", error);
    },
  });
};

// DELETE PRODUCT
export const useDeleteProduct = (): UseMutationResult<
  Product,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, string>({
    mutationFn: async (productId: string) => {
      const response = await apiClient.delete<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.DELETE}/${productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to delete product:", error);
    },
  });
};
