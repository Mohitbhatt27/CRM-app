import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

export default axiosInstance;
