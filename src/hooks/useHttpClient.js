import { useState, useCallback } from "react";
import api from "../api/axios";

const useHttpClient = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (params) => {
    try {
      setIsloading(true);
      const res = await api.request(params);
      if (res.status > 400) {
        throw new Error(res.message);
      }
      setIsloading(false);
      return res.data;
    } catch (error) {
      setIsloading(false);
      setError(error.response.data || "Something went wrong.");
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttpClient;
