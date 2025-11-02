export default function CityCard({ city, onRemove, onClick }) {
      const iconUrl = `https://openweathermap.org/img/wn/${city?.weather?.raw?.weather[0]?.icon}@2x.png`;

//       return (
//     <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-6 text-center w-80 mx-auto mt-6">
//       <h2 className="text-2xl font-bold">{city.name}</h2>
//       <img src={iconUrl} alt="weather icon" className="mx-auto" />

//       <p className="text-lg font-semibold">
//         {city.weather.temp}°C
//       </p>

//       <p className="capitalize">{city.weather.description}</p>

//       {/* <div className="mt-4 flex justify-between text-sm text-gray-600">
//         <p>Humidity: {weather.main.humidity}%</p>
//         <p>Wind: {weather.wind.speed} m/s</p>
//       </div> */}
//     </div>
//   );
  return (
    <div 
      onClick={onClick}
     className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-6 text-center 
             hover:shadow-2xl transition-all cursor-pointer relative group
             w-full"
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click navigation
          onRemove(city._id);
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 
                   transition text-xl font-bold"
        title="Remove city"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
        {city?.name}
      </h2>

      <img src={iconUrl} alt="weather icon" className="mx-auto w-20" />

      <p className="text-3xl font-semibold mt-2">{city?.weather?.temp}°C</p>
      <p className="text-gray-600 capitalize">{city?.weather?.description}</p>
    </div>
  );
}
