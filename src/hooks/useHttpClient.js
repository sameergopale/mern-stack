import { useState } from "react";
import api from "../api/axios";

const useHttpClient = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (params) => {
    try {
      setIsloading(true);
      const res = await api.request(params);
      if (res.status > 400) {
        throw new Error(res.message);
      }
      setData(res.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError(error.response.data || "Something went wrong.");
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttpClient;
