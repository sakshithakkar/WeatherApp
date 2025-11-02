import { useState } from "react";

export default function SearchBar({ onAdd }) {
  const [city, setCity] = useState("");

  const handleAdd = () => {
    if (!city.trim()) return;
    onAdd(city);
    setCity("");
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add
      </button>
    </div>
  );
}
