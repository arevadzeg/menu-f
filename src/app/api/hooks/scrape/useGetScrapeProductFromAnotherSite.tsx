import { useQuery } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';

interface ScrapedData {
  title: string;
  image: string;
  price: number;
}

interface UseGetScrapeProductFromAnotherSiteProps {
  url: string;
}

const useGetScrapeProductFromAnotherSite = ({
  url,
}: UseGetScrapeProductFromAnotherSiteProps) => useQuery<ScrapedData, Error>({
  queryKey: ['scraped-data', url],
  queryFn: () => apiClient
    .post(`${API_ENDPOINTS.SCRAPE.GET_SCRAPE_PRODUCT_FROM_ANOTHER_SITE}`, {
      url,
    })
    .then((res) => res.data),
  enabled: false,
});

export default useGetScrapeProductFromAnotherSite;
