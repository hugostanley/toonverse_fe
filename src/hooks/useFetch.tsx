import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiClient } from "@utils";

type FetchOptions = AxiosRequestConfig;

type UseFetchDataResponse = {
  data: any | null;
  error: string | null;
  isLoading: boolean;
  fetchData: (
    url: string,
    options?: FetchOptions,
    redirectPath?: string
  ) => Promise<void>;
};

function useFetch(): UseFetchDataResponse {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchData(
    url: string,
    options: FetchOptions = {},
    redirectPath?: string
  ) {
    try {
      setIsLoading(true);

      const axiosConfig: AxiosRequestConfig = {
        ...options,
        method: options.method || "GET",
        url: url,
        data: options.data ? JSON.stringify(options.data) : undefined,
        headers: {
          ...options.headers,
        },
      };

      console.log("Request data:", axiosConfig);

      const response: AxiosResponse = await apiClient(axiosConfig);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        setData(response.data);
        if (redirectPath) {
          navigate(redirectPath);
        }
        return response.data;
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
      console.error('API Error:', errorMessages);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, error, isLoading, fetchData };
}

export default useFetch;
