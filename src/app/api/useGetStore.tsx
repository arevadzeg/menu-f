import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";

interface responseType {
  id: string; // UUID of the store
  userId: string; // UUID of the user associated with the store
  name: string; // Name of the store
  address: string; // Store's address
  createdAt: string; // ISO string for the creation date
  updatedAt: string; // ISO string for the update date
  email?: string; // Optional email
  phone?: string; // Optional phone number
  facebook?: string; // Optional Facebook URL
  instagram?: string; // Optional Instagram URL
  image?: string; // Optional image URL
}

const useGetStore = () => {
  const name = "Grafika";

  return useQuery<responseType, Error>({
    queryKey: ["store"],
    queryFn: () => {
      return apiClient
        .get(`${API_ENDPOINTS.STORE.GET_STORE_BY_NAME}/${name}`)
        .then((res) => res.data);
    },
  });
};

export default useGetStore;
