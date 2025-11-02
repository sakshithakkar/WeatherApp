import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { getCities, addCity, deleteCity } from "../api/weatherApi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCities();
  }, []);

  return (
  <div className="max-w-4xl mx-auto py-10 px-4">
    <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600 tracking-tight">
      🌤️ Weather Dashboard
    </h1>

    {/* Search Input */}
    <div className="flex justify-center mb-8">
      <SearchBar onAdd={handleAddCity} />
    </div>

    {/* Cities */}
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
);


//   return (
//     <div className="max-w-2xl mx-auto py-6">
//       <h1 className="text-3xl font-bold text-center mb-4">Weather Dashboard</h1>
//       <SearchBar onAdd={handleAddCity} />

//       <div className="space-y-3 mt-4">
//         {cities.map((c) => (
//           <CityCard
//             key={c._id}
//             city={c}
//             onRemove={handleRemoveCity}
//             onClick={() => navigate(`/city/${c.name}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
}
