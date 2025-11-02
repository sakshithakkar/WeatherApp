export function formatForecastData(forecast) {
  // Filter to daily 12:00 PM records
  const daily = forecast.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  return daily.map(item => ({
    date: item.dt_txt.split(" ")[0],
    temp: item.main.temp
  }));
}
