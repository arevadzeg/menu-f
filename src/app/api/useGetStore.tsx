import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";
import API_ENDPOINTS from "./endpoints";
import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "../atom/authAtom";

interface storeInterface {
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
  const params = useParams();
  const name = params.appName;

  return useQuery<storeInterface, Error>({
    queryKey: ["store"],
    queryFn: () => {
      return apiClient
        .get(`${API_ENDPOINTS.STORE.GET_STORE_BY_NAME}/${name}`)
        .then((res) => res.data);
    },
    enabled: !!name,
  });
};

export default useGetStore;

export const useGetUserStores = () => {
  const [user] = useAtom(authAtom);

  return useQuery<storeInterface[], Error>({
    queryKey: ["store", user?.user.id],
    queryFn: () => {
      return apiClient
        .get(`${API_ENDPOINTS.STORE.GET_ALL_BY_USER}/${user?.user.id}`)
        .then((res) => res.data);
    },
    enabled: !!user,
  });
};
