import axios from "axios";

// ✅ Always use backend API base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., "https://outfytly-backend.onrender.com"
  withCredentials: true,                 // keep cookies if used
});

// ✅ Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
