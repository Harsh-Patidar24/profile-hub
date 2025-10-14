// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://profile-hub-lah6.onrender.com" : "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  console.log("ENV:", process.env.NEXT_PUBLIC_ENVIRONMENT);
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
