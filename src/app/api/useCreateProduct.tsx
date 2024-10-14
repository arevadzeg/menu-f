"use client";
import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";
import { AxiosResponse } from "axios";

interface CreateProductPayload {
  title: string;
  price: number;
  isOnSale?: boolean;
  image: string;
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
        newProduct
      );
      return response.data;
    },
  });
};

export default useCreateProduct;
