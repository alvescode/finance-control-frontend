import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("finance-control-jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any): Promise<any> => Promise.reject(error)
);

export default api;
