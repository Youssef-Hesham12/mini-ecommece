import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL as string;

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiV2 = axios.create({
  baseURL: apiBaseUrl.replace("/api/v1", "/api/v2"),
  headers: {
    "Content-Type": "application/json",
  },
});
