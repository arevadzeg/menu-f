"use client";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";
import { AxiosResponse } from "axios";
import removeFalseyValues from "../utils/removeFalseyValues";

interface CreateProductPayload {
  title: string;
  price: number;
  isOnSale?: boolean;
  image: string;
}

interface UpdateProductPayload extends CreateProductPayload {
  productId: string;
}

interface Product {
  id: string;
  storeId: string;
  title: string;
  price: number;
  isOnSale: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Define the mutation hook
const useCreateProduct = () => {
  const storeId = "3a1a255b-c22e-4ddf-90e5-94c8e21e8790";

  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: async (newProduct: CreateProductPayload) => {
      const response = await apiClient.post<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.CREATE}/${storeId}`,
        removeFalseyValues(newProduct)
      );
      return response.data;
    },
  });
};

export default useCreateProduct;

export const useUpdateProduct = () => {
  return useMutation<Product, Error, UpdateProductPayload>({
    mutationFn: async (product: UpdateProductPayload) => {
      const response = await apiClient.put<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.UPDATE}/${product.productId}`,
        removeFalseyValues(product)
      );
      return response.data;
    },
  });
};

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
