// lib/WeatherFetcher.js


export async function getWeatherForCity(cityName) {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10`
  );

  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  // Take the best match (or first)
  const loc = geoData.results[0];

  return getWeatherForCoords({
    lat: loc.latitude,
    lon: loc.longitude,
    timezone: loc.timezone || "auto",
    label: {
      name: loc.name,
      country: loc.country,
      admin1: loc.admin1,
    },
  });
}

export async function getWeatherForCoords({ lat, lon, timezone, label }) {
  const tz = timezone && timezone !== "auto" ? timezone : "auto";

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current_weather=true` +
    `&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,precipitation` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max` +
    `&timezone=${encodeURIComponent(tz)}`;

  const airUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&hourly=european_aqi,pm2_5,pm10` +
    `&timezone=${encodeURIComponent(tz)}`;

  const [weatherRes, airRes] = await Promise.all([
    fetch(weatherUrl, { next: { revalidate: 300 } }),
    fetch(airUrl, { next: { revalidate: 300 } }),
  ]);

  const weatherData = await weatherRes.json();
  const airData = await airRes.json();

  const current = weatherData.current_weather;
  const hourly = weatherData.hourly;
  const daily = weatherData.daily;

  // AQI pick
  let aqiValue = null;
  if (airData?.hourly?.time && airData.hourly.european_aqi) {
    const idx = airData.hourly.time.indexOf(current.time);
    aqiValue = airData.hourly.european_aqi[idx >= 0 ? idx : 0];
  }

  const currentWeather = {
    city: label?.name || "Unknown",
    country: label?.country || "",
    admin1: label?.admin1 || "",
    temperature: current.temperature,
    feelsLike: hourly.apparent_temperature[0],
    description: mapWeatherCode(current.weathercode),
    localTime: current.time.replace("T", " "),
    weatherCode: current.weathercode,
    windSpeed: current.windspeed,
    humidity: hourly.relativehumidity_2m[0],
    precipitationNow: hourly.precipitation[0],
    isDay: current.is_day === 1,
  };

  const stats = [
    { label: "Humidity", value: hourly.relativehumidity_2m[0] + "%" },
    { label: "Wind", value: current.windspeed + " km/h" },
    { label: "Precipitation (now)", value: hourly.precipitation[0] + " mm" },
  ];

  const hourlyForecast = hourly.time.slice(0, 12).map((t, i) => ({
    time: t.split("T")[1],
    temp: hourly.temperature_2m[i],
    weatherCode: hourly.weathercode?.[i]
  }));

  const weeklyForecast = daily.time.map((date, i) => ({
    day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
    min: daily.temperature_2m_min[i],
    max: daily.temperature_2m_max[i],
    weatherCode: daily.weathercode?.[i],
  }));

  const environment = {
    uvIndex: daily.uv_index_max?.[0] ?? null,
    sunrise: daily.sunrise?.[0] ?? null,
    sunset: daily.sunset?.[0] ?? null,
    aqi: aqiValue,
    aqiCategory: aqiValue != null ? mapAqiCategory(aqiValue) : null,
    isDay: current.is_day === 1,
  };

  return { currentWeather, stats, hourlyForecast, weeklyForecast, environment };
}
// Your existing mapping
function mapWeatherCode(code) {
  const map = {
   // Clear
    0: "Clear sky",
    1: "Mainly clear",

    // Clouds
    2: "Partly cloudy",
    3: "Overcast",

    // Fog
    45: "Foggy",
    48: "Rime fog",

    // Drizzle
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",

    // Freezing Drizzle
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    // Rain
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",

    // Freezing Rain
    66: "Light freezing rain",
    67: "Heavy freezing rain",

    // Snowfall
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",

    // Rain showers
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",

    // Snow showers
    85: "Light snow showers",
    86: "Heavy snow showers",

    // Thunderstorms
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return map[code] || "Unknown";
}

// Simple EU AQI category mapping
function mapAqiCategory(aqi) {
  if (aqi <= 20) return "Good";
  if (aqi <= 40) return "Fair";
  if (aqi <= 60) return "Moderate";
  if (aqi <= 80) return "Poor";
  if (aqi <= 100) return "Very poor";
  return "Hazardous";
}
