import { makeApiRequest } from '@/core/makeApiRequest';
import useSWR from 'swr';

export const useApiDataFetcher = <T>(url: string) => {
  const useFetcherData = async () => {
    const response = await makeApiRequest<T>(url, 'GET');
    return response.data;
  };

  const { data, error, isLoading } = useSWR<T>(url, useFetcherData);
  return { data, error, isLoading };
};
