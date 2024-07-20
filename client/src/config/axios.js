import axios from "axios";
import BASE_URL from "../helper";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080"
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:auth"))?.token
  );
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
