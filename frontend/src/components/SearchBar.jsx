import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onAdd }) {
  const [city, setCity] = useState("");

  const handleAdd = () => {
    if (!city.trim()) return;
    onAdd(city);
    setCity("");
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-md bg-white/70 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200">
      
      <input
        className="flex-1 p-2 bg-transparent outline-none text-gray-800 placeholder-gray-500"
        placeholder="Search for a city (e.g., Mumbai)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />

      <button
        onClick={handleAdd}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                   hover:bg-blue-700 transition shadow-md hover:shadow-lg hover:scale-[1.05]"
      >
        <FaSearch className="text-sm" />
        Search
      </button>
    </div>
  );
}
