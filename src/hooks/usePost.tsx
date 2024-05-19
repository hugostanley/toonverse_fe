import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient, setLocalStorage } from '@utils';

type PostOptions = {
  body?: object;
};

type UsePostResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  postFetch: (url: string, options?: PostOptions, redirectPath?: string) => Promise<void>;
};

function usePost(): UsePostResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function postFetch(url: string, options: PostOptions = {}, redirectPath?: string) {
    try {
      setIsLoading(true);

      const response = await apiClient.post(url, options.body);
      const responseData = response.data;
      console.log('Response data:', responseData);

      if (response.status >= 200 && response.status < 300) {
        // Save headers
        const headersObject = response.headers;
        setLocalStorage('Headers', headersObject);
        setLocalStorage('AccountData', responseData);

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
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, postFetch };
}

export default usePost
