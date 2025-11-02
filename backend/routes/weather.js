const express = require('express');
const router = express.Router();
const City = require('../models/City');
const { fetchWeatherByCityName,fetchForecastByCityName } = require('../utils/weatherClient');
const auth = require("../middleware/auth.js");

// GET /api/weather/:city - fetch weather for specific city (by name)
router.get('/:city',auth, async (req, res) => {
  const cityName = req.params.city;
  try {
    // fetch fresh data from API and update DB if city exists or return fresh
    const data = await fetchWeatherByCityName(cityName);
    const mapped = {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind?.speed,
      wind_deg: data.wind?.deg,
      description: data.weather?.[0]?.description,
      raw: data
    };

    // update DB record if tracked
    const cityDoc = await City.findOneAndUpdate(
      { name: new RegExp('^' + cityName + '$', 'i') },
      { 
        name: data.name,
        country: data.sys?.country,
        weather: mapped,
        lastUpdated: new Date()
      },
      { new: true }
    );

    res.json({ fromApi: true, city: cityDoc || { name: data.name, weather: mapped } });
  } catch (err) {
    console.error(err);
    // fallback: try to return stored data if exists
    const stored = await City.findOne({ name: new RegExp('^' + cityName + '$', 'i') });
    if (stored && stored.weather) {
      return res.json({ fromApi: false, city: stored });
    }
    res.status(500).json({ error: 'Could not fetch weather' });
  }
});

router.get("/forecast/:city", auth, async (req, res) => {
  try {
      const data = await fetchForecastByCityName(req.params.city);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching forecast" });
  }
});

module.exports = router;
