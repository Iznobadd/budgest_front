import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const usePostRequest = <T, R>(endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postRequest = async (data: T): Promise<R> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<R>(`${endpoint}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (err: any) {
      setError(err.response.data.message || "An error occured");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postRequest, loading, error };
};

export default usePostRequest;
