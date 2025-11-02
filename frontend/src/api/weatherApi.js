import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCities = () => API.get("/cities");
export const addCity = (city) => API.post("/cities", { name: city });
export const deleteCity = (id) => API.delete(`/cities/${id}`);
export const getWeatherByCity = (city) => API.get(`/weather/${city}`);
