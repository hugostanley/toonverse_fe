import { useState } from 'react';
import { apiClient, setLocalStorage } from '@utils';

type PostAuthOptions = {
  body?: object;
};

type UsePostAuthResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  postAuth: (url: string, options?: PostAuthOptions, redirectCallback?: (data: any) => void) => Promise<void>;
};

function usePostAuth(): UsePostAuthResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function postAuth(url: string, options: PostAuthOptions = {}, redirectCallback?: (data: any) => void) {
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
        if (redirectCallback) {
          redirectCallback(responseData);
        }
      } else {
        throw new Error('An unexpected error occurred.');
      }
    } catch (error) {
      let errorMessages = '';
      if ((error as any).response && (error as any).response.data) {
        const responseData = (error as any).response.data;
        if (responseData.errors && responseData.errors.full_messages) {
          errorMessages = responseData.errors.full_messages.join('. ');
        } else if (responseData.errors && Array.isArray(responseData.errors)) {
          errorMessages = responseData.errors.join('. ');
        }
      }
      setError(errorMessages);
      console.error("API Error:", errorMessages);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, postAuth };
}

export default usePostAuth
