import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
});

apiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Sessão expirada. Faça login novamente.");

      localStorage.removeItem("token");

      const navigate = useNavigate();
      navigate("/login");
    } else {
      toast.error("Erro inesperado. Por favor, tente novamente mais tarde!");
      console.error("Internal server error:", error.response || error.message);
    }

    return Promise.reject(error);
  },
);

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiInstance.get<T>(url, config).then((res) => res.data),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiInstance.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    apiInstance.delete<T>(url, config).then((res) => res.data),
};
