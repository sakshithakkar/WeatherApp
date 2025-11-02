import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { getCities, addCity, deleteCity } from "../api/weatherApi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const fetchCities = async () => {
    const { data } = await getCities();
    setCities(data);
  };

  const handleAddCity = async (city) => {
    await addCity(city);
    fetchCities();
  };

  const handleRemoveCity = async (id) => {
    await deleteCity(id);
    fetchCities();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          WeatherApp ⛅
        </h1>

        <div className="flex items-center gap-4">
          {email && (
            <span className="text-gray-600 text-sm hidden sm:block">
              {email}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ Dashboard UI */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-tight">
          🌤️ Weather Dashboard
        </h1>

        <div className="flex justify-center mb-8">
          <SearchBar onAdd={handleAddCity} />
        </div>

        {cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {cities.map((c) => (
              <CityCard
                key={c._id}
                city={c}
                onRemove={handleRemoveCity}
                onClick={() => navigate(`/city/${c.name}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10 text-lg">
            No cities added yet. Search a city to get started 🌎
          </div>
        )}
      </div>
    </>
  );
}
