
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";
import { AxiosResponse } from "axios";
import removeFalseyValues from "../../../utils/removeFalseyValues";
import { useParams, useSearchParams } from "next/navigation";
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

  const { subCategoryId, categoryId } = useParams();
  const { data: store } = useGetStore();
  const storeId = store?.id ?? "";
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";


  return useMutation<Product, Error, UpdateProductPayload>({
    mutationFn: async (product) => {
      const response = await apiClient.put<Product, AxiosResponse<Product>>(
        `${API_ENDPOINTS.PRODUCT.UPDATE}/${product.productId}`,
        removeFalseyValues(product)
      );
      return response.data;
    },
    onMutate: async (updatedProduct) => {


      const queryKey = [
        "products",
        search,
        sort,
        order,
        storeId,
        subCategoryId,
        categoryId,
      ]

      queryClient.setQueriesData(
        { predicate: ({ queryKey }) => queryKey[0] === "products" },
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              products: page.products.filter((p: any) => {
                return p.id !== updatedProduct.productId
              }),
            })),
          };
        }
      );
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return { pages: [{ products: [updatedProduct], totalCount: 1 }], pageParams: [1] };

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === oldData.pages.length - 1) {
              // TODO MAKE DYNAMIC SORT
              const updatedProducts = [...page.products, updatedProduct].sort((a, b) =>
                a.title.localeCompare(b.title)
              );
              return {
                ...page,
                products: updatedProducts,
                totalCount: updatedProducts.length,
              };
            }
            return page;
          }),
        };
      });

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
