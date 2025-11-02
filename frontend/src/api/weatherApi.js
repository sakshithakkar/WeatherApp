import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getCities = () => API.get("/cities");
export const addCity = (city) => API.post("/cities", { name: city });
export const deleteCity = (id) => API.delete(`/cities/${id}`);
export const getWeatherByCity = (city) => API.get(`/weather/${city}`);
export const getForecast = (city) => API.get(`/weather/forecast/${city}`);

export const login = (email, password) => API.post("/auth/login", { email, password });
export const register = (email, password) => API.post("/auth/register", { email, password });

