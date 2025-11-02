const express = require('express');
const router = express.Router();
const City = require('../models/City');
const { fetchWeatherByCityName } = require('../utils/weatherClient');
const auth = require("../middleware/auth.js");


// POST /api/cities - add new city to track
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'City name required' });

    // normalize name (simple)
    const normalized = name.trim();

    // optionally fetch initial weather
    let weatherData;
    try {
      weatherData = await fetchWeatherByCityName(normalized);
    } catch (err) {
      // if API fails, still allow creation but without weather
      console.warn('Could not fetch weather for', normalized, err.message);
    }

    const city = new City({
      name: normalized,
      country: weatherData?.sys?.country,
      lastUpdated: weatherData ? new Date() : undefined,
      weather: weatherData ? mapWeather(weatherData) : undefined
    });

    await city.save();
    res.status(201).json(city);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'City already tracked' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/cities - list tracked cities
router.get('/',auth, async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE /api/cities/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const city = await City.findByIdAndDelete(id);
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// helper to map OpenWeather response to our weather object
function mapWeather(data) {
  return {
    temp: data?.main?.temp,
    feels_like: data?.main?.feels_like,
    temp_min: data?.main?.temp_min,
    temp_max: data?.main?.temp_max,
    humidity: data?.main?.humidity,
    pressure: data?.main?.pressure,
    wind_speed: data?.wind?.speed,
    wind_deg: data?.wind?.deg,
    description: data?.weather?.[0]?.description,
    raw: data
  };
}

module.exports = router;
