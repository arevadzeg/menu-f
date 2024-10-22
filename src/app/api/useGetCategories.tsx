import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";
import { useParams } from "next/navigation";
import useGetStore from "./useGetStore";

interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}

const useGetCategories = () => {
  const { data: store } = useGetStore();
  const storeId = store?.id ?? "";

  return useQuery<Category[], Error>({
    queryKey: ["category"],
    queryFn: () => {
      return apiClient
        .get(`${API_ENDPOINTS.STORE.GET_CATEGORIES}/${storeId}`)
        .then((res) => res.data);
    },
    enabled: !!storeId,
  });
};

export default useGetCategories;
