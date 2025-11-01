const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  temp: Number,
  feels_like: Number,
  temp_min: Number,
  temp_max: Number,
  humidity: Number,
  pressure: Number,
  wind_speed: Number,
  wind_deg: Number,
  description: String,
  raw: Object // full raw payload if needed
}, { _id: false });

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "London"
  country: String, // optional
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date },
  weather: WeatherSchema
});

CitySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('City', CitySchema);
