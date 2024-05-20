import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient, setLocalStorage } from '@utils';

type PostAuthOptions = {
  body?: object;
};

type UsePostAuthResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  postAuth: (url: string, options?: PostAuthOptions, redirectPath?: string) => Promise<void>;
};

function usePostAuth(): UsePostAuthResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function postAuth(url: string, options: PostAuthOptions = {}, redirectPath?: string) {
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
      const apiErrors = (error as any)?.response.data.errors.full_messages.join('. ')
      setError(apiErrors || "An unexpected error occurred. Please try again later.");
      console.error("Error:", error);
      console.log('Error Response Data:', apiErrors);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, postAuth };
}

export default usePostAuth
