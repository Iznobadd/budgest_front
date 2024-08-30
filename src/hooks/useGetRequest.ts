import { useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

const useGetRequest = <R>(endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRequest = useCallback(
    async (params?: Record<string, any>): Promise<R> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<R>(`${endpoint}`, {
          params,
          withCredentials: true,
        });
        return response.data;
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  return { getRequest, loading, error };
};

export default useGetRequest;
