import { useQuery } from "@tanstack/react-query";
import apiClient from "../../apiClient";
import API_ENDPOINTS from "../../endpoints";

interface ScrapedData {
  title: string;
  image: string;
  price: number;
}

interface useGetScrapeProductFromAnotherSiteProps {
  url: string;
}

export const useGetScrapeProductFromAnotherSite = ({
  url,
}: useGetScrapeProductFromAnotherSiteProps) => {
  return useQuery<ScrapedData, Error>({
    queryKey: ["scraped-data", url],
    queryFn: () => {
      return apiClient
        .post(`${API_ENDPOINTS.SCRAPE.GET_SCRAPE_PRODUCT_FROM_ANOTHER_SITE}`, {
          url,
        })
        .then((res) => res.data);
    },
    enabled: false,
  });
};
