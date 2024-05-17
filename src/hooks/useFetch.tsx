import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from '@utils';

type FetchOptions = AxiosRequestConfig;

type UseFetchDataResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  fetchData: (url: string, options?: FetchOptions, redirectPath?: string) => Promise<void>;
};

function useFetch(): UseFetchDataResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchData(url: string, options: FetchOptions = {}, redirectPath?: string) {
    try {
      setIsLoading(true);

      const axiosConfig: AxiosRequestConfig = {
        ...options,
        method: options.method || 'GET',
        url: url,
        data: options.data ? JSON.stringify(options.data) : undefined,
        headers: {
          ...options.headers,
        },
      };

      console.log('Request data:', axiosConfig);

      const response: AxiosResponse = await apiClient(axiosConfig);

      console.log('Response data:', response.data);

      if (response.status === 200) {
        setData(response.data);
        if (redirectPath) {
          navigate(redirectPath);
        }
        return response.data;
      } else {
        const responseData = response.data;
        if (responseData.errors && responseData.errors.length > 0) {
          setError(responseData.errors.join('. '));
        } else {
          setError('An unexpected error occurred.');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, fetchData }
}

export default useFetch
