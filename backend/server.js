const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const cityRoutes = require('./routes/cities');
const weatherRoutes = require('./routes/weather');
const City = require('./models/City');
const { fetchWeatherByCityName } = require('./utils/weatherClient');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cities', cityRoutes);
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;

console.log(process.env.MONGODB_URI, ' process.env.MONGODB_URI')

// Connect to MongoDB database using connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log("Mongodb connected")))
  .catch(err => console.log(err));

// Scheduler: update weather for all tracked cities every hour
// Cron expression "0 * * * *" => at minute 0 of every hour
cron.schedule('0 * * * *', async () => {
  console.log('Starting scheduled weather update:', new Date().toISOString());
  try {
    const cities = await City.find();
    for (const c of cities) {
      try {
        const data = await fetchWeatherByCityName(c.name);
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
        c.weather = mapped;
        c.lastUpdated = new Date();
        await c.save();
        console.log(`Updated ${c.name}`);
      } catch (err) {
        console.warn(`Failed to update ${c.name}:`, err.message);
      }
    }
  } catch (err) {
    console.error('Scheduled update error:', err);
  }
}, {
  timezone: 'UTC' // you can adapt timezone if needed
});

// simple health check
app.get('/', (req, res) => res.send('Weather-tracker backend is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
