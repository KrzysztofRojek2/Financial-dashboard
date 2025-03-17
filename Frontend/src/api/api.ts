import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const userId = useAuthStore.getState().userId;
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("JWT Token is missing");
  if (!userId) throw new Error("User ID is missing");

  config.headers.Authorization = `${token}`;

  if (config.url?.includes("{userId}")) {
    config.url = config.url.replace("{userId}", String(userId));
  }

  return config;
});

export default api;
