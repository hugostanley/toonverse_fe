import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '@utils';

type FetchOptions = {
  method?: string;
  headers?: object;
  body?: object;
};

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

  async function fetchData(url: string, options: FetchOptions = {},  redirectPath?: string) {
    try {
      setIsLoading(true);
      const headers = getLocalStorage('Headers') || {};

      // log req data
      console.log('Request data:', {
        method: options.method,
        body: JSON.stringify(options.body),
        url,
        headers: {
          'Content-Type': 'application/json',
          'access-token': headers['access-token'],
          'client': headers['client'],
          'uid': headers['uid'],
          'expiry': headers['expiry'],
          'authorization': headers['authorization'],
        },
      });

      const response = await fetch(url, {
        ...options,
        method: options.method || 'GET',
        body: JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
          'access-token': headers['access-token'],
          'client': headers['client'],
          'uid': headers['uid'],
          'expiry': headers['expiry'],
          'authorization': headers['authorization'],
          ...options.headers,
        },
      });

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        setData(responseData);
        if (redirectPath) {
          navigate(redirectPath);
        }
      } else {
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

  return { data, error, isLoading, fetchData };
}

export default useFetch;
