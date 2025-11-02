import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWeatherByCity } from "../api/weatherApi";

export default function CityDetails() {
    const { name } = useParams();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        getWeatherByCity(name).then(({ data }) => setInfo(data));
    }, [name]);

    if (!info) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg animate-pulse">Loading weather...</p>
            </div>
        );
    }

    const weather = info.city.weather;
    const iconUrl = `https://openweathermap.org/img/wn/${weather.raw.weather[0].icon}@2x.png`;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Link
                to="/dashboard"
                className="inline-block mb-4 text-blue-700 font-semibold hover:text-blue-900 transition flex gap-2 items-center"
            >
                ← Back to Dashboard
            </Link>

            <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 text-center">

                {/* City Name */}
                <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                    {info.city.name}
                </h2>

                {/* Weather Icon */}
                <img src={iconUrl} alt="weather icon" className="w-28 mx-auto drop-shadow-lg" />

                {/* Description */}
                <p className="text-xl font-medium text-gray-700 capitalize">
                    {weather.description}
                </p>

                {/* Temperature */}
                <p className="text-5xl font-bold text-indigo-700 mt-2">
                    {weather.temp}°C
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6 text-gray-700 mt-8 text-lg font-medium">
                    <div className="flex items-center gap-2">
                        🌡️ Temp
                        <span className="font-semibold text-gray-900">{weather.temp}°C</span>
                    </div>

                    <div className="flex items-center gap-2">
                        💧 Humidity
                        <span className="font-semibold text-gray-900">{weather.humidity}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                        💨 Wind
                        <span className="font-semibold text-gray-900">{weather.wind_speed} m/s</span>
                    </div>

                    <div className="flex items-center gap-2">
                        🌅 Sunrise
                        <span className="font-semibold text-gray-900">
                            {new Date(weather.raw.sys.sunrise * 1000).toLocaleTimeString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        🌇 Sunset
                        <span className="font-semibold text-gray-900">
                            {new Date(weather.raw.sys.sunset * 1000).toLocaleTimeString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
