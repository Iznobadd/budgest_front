import axios from "axios";
import isTokenExpired from "./isTokenExpired";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_URL_API}auth/refresh`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = response.data.access_token;
          localStorage.setItem("access_token", newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error("Error during token refresh", error);
          localStorage.removeItem("access_token");
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("Response error", error.response);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL_API}auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = response.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error during token refresh", err);
        localStorage.removeItem("access_token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
