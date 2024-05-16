import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocalStorage } from '@utils';

type FetchOptions = {
  method?: string;
  body?: object;
};

type UseFetchAuthResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  fetchAuth: (url: string, options?: FetchOptions, redirectPath?: string) => Promise<void>;
};

function useFetchAuth(): UseFetchAuthResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchAuth(url: string, options: FetchOptions = {}, redirectPath?: string) {
    try {
      setIsLoading(true)

      // log req data
      console.log('Request data:', {
        method: options.method,
        body: JSON.stringify(options.body),
        url,
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fetch(url, {
        ...options,
        method: options.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options.body)
      })

      const headersObject = Object.fromEntries(response.headers.entries());

      const responseData = await response.json();
      console.log('Response data:', responseData);
      console.log('Headers:', headersObject);

      if (response.ok) {
        setLocalStorage('Headers', headersObject);
        setData(responseData)
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
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, fetchAuth };
}

export default useFetchAuth
