import useSWR from 'swr';

import { makeApiRequest } from '@/core/makeApiRequest';

export const useApiDataFetcher = <T>(url: string) => {
  const useFetcherData = async () => {
    const response = await makeApiRequest<T>(url, 'GET');
    return response.data;
  };

  const { data, error, isLoading, mutate } = useSWR<T>(url, useFetcherData);
  return { data, error, isLoading, mutate };
};
