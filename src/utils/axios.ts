import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: "https://www.omdbapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: apiKey,
  },
});

export default api;