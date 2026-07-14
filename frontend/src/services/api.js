import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error("Session expired. Please login again.");

      // Prevent redirect loop if already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const deleteAnalysis = (id) => {
  return api.delete(`/analysis/${id}`);
};

export default api;