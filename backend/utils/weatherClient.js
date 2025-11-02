const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const BASE = process.env.OPENWEATHER_BASE;
const KEY = process.env.OPENWEATHER_API_KEY;
const UNITS = process.env.UNITS || 'metric';
if (!KEY) {
  console.warn('OPENWEATHER_API_KEY is not set; external fetches will fail.');
}

async function fetchWeatherByCityName(cityName) {
  if (!KEY) throw new Error('OpenWeather API key not configured');
  const url = `${BASE}/weather`;
  const params = {
    q: cityName,
    appid: KEY,
    units: UNITS
  };

  const res = await axios.get(url, { params });
  return res.data;
}

//  Fetch 5-day forecast
async function fetchForecastByCityName(cityName) {
  if (!KEY) throw new Error('OpenWeather API key not configured');
  const url = `${BASE}/forecast`;
  const params = { q: cityName, appid: KEY, units: UNITS };

  const res = await axios.get(url, { params });
  return res.data;
}

module.exports = { fetchWeatherByCityName,fetchForecastByCityName };
