import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWeatherByCity, getForecast } from "../api/weatherApi";
import TemperatureChart from "../components/TemperatureChart";
import { formatForecastData } from "../utils/formatForecastData";

export default function CityDetails() {
  const { name } = useParams();
  const [info, setInfo] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [forecastChartData, setForecastChartData] = useState([]);

  useEffect(() => {
    getWeatherByCity(name).then(({ data }) => setInfo(data));

    getForecast(name).then(({ data }) => {
      const daily = [];
      const grouped = {};

      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(item);
      });

      Object.keys(grouped).slice(0, 5).forEach((date) => {
        const mid = grouped[date][Math.floor(grouped[date].length / 2)];
        daily.push(mid);
      });

      setForecast(daily);

      const formatted = formatForecastData(data);
      setForecastChartData(formatted);
    });
  }, [name]);

  if (!info) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading weather...
        </p>
      </div>
    );
  }

  const weather = info.city.weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.raw.weather[0].icon}@2x.png`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link
        to="/dashboard"
        className="inline-block mb-5 text-blue-700 font-semibold hover:text-blue-900 transition flex gap-2 items-center"
      >
        ← Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">

        {/* Weather Card */}
        <div className="bg-white/80 p-6 rounded-2xl shadow-xl border backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{info.city.name}</h2>
          <img src={iconUrl} alt="icon" className="w-28 mx-auto drop-shadow-lg" />
          <p className="text-lg font-medium text-gray-600 capitalize">
            {weather.description}
          </p>
          <p className="text-5xl font-bold text-indigo-700 mt-2">
            {weather.temp}°C
          </p>

          <div className="grid grid-cols-2 gap-4 text-gray-700 mt-6 text-md font-medium">
            <p>🌡️ Feels Like: <span className="font-bold text-gray-900">{weather.feels_like}°C</span></p>
            <p>💧 Humidity: <span className="font-bold text-gray-900">{weather.humidity}%</span></p>
            <p>💨 Wind: <span className="font-bold text-gray-900">{weather.wind_speed} m/s</span></p>
            <p>📊 Pressure: <span className="font-bold text-gray-900">{weather.raw.main.pressure} hPa</span></p>
          </div>
        </div>

        {/* Metrics Card */}
        <div className="bg-white/80 p-6 rounded-2xl shadow-xl border backdrop-blur-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Today's Summary</h3>

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-md">
            <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
              <p className="font-semibold">🌅 Sunrise</p>
              <p>{new Date(weather.raw.sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
              <p className="font-semibold">🌇 Sunset</p>
              <p>{new Date(weather.raw.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
              <p className="font-semibold">👁 Visibility</p>
              <p>{weather.raw.visibility} m</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
              <p className="font-semibold">🤧 Air?</p>
              <p>Coming Soon</p>  
            </div>
          </div>
        </div>

        {/* Big Card: Chart + Forecast */}
        <div className="md:col-span-2 bg-white/90 p-8 rounded-2xl shadow-2xl border">
          <TemperatureChart data={forecastChartData} />

          <h3 className="text-xl font-bold mt-6 mb-4 text-gray-900">
            5-Day Weather Forecast
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            {forecast.map((day) => {
              const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              });
              const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

              return (
                <div key={day.dt} className="bg-gray-100 p-4 rounded-xl shadow-md">
                  <p className="font-medium">{date}</p>
                  <img src={icon} alt="icon" className="w-10 mx-auto" />
                  <p className="font-bold">{Math.round(day.main.temp)}°C</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {day.weather[0].description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
