// // app/weather/[city]/page.js
import { getWeatherForCity, getWeatherForCoords } from "@/lib/WeatherFetcher";
import { getWeatherTheme } from "@/lib/WeatherStyles";
import { getWeatherVideoSrc } from "@/lib/WeatherVideo";
import CurrentWeatherCard from "@/Components/CurrentWeatherCard";
import HourlyForecastCard from "@/Components/HourlyForecastCard";
import StatsCard from "@/Components/StatsCard";
import WeeklyForecastCard from "@/Components/WeeklyForecastCard";
import EnvStatsCard from "@/Components/EnvStatCard";

export default async function CityWeatherPage({ params, searchParams }) {
  const p = await params;          // ✅ REQUIRED in your version
  const sp = await searchParams;   // ✅ ok

  const cityLabel = decodeURIComponent(p.city);

  const lat = sp?.lat ? Number(sp.lat) : null;
  const lon = sp?.lon ? Number(sp.lon) : null;
  const tz = sp?.tz || "auto";

  const label = {
    name: sp?.name || cityLabel.split(",")[0].trim(),
    admin1: sp?.admin1 || "",
    country: sp?.country || "",
  };

  let data;
  try {
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      data = await getWeatherForCoords({ lat, lon, timezone: tz, label });
    } else {
      const cityOnly = cityLabel.split(",")[0].trim();
      data = await getWeatherForCity(cityOnly);
    }
  } catch {
    return (
      <div className="mx-auto max-w-xl py-10">
        <h2 className="mb-2 text-2xl font-semibold text-slate-900">City not found</h2>
        <p className="text-slate-700">
          We couldn&apos;t find weather data for "<strong>{cityLabel}</strong>". Try another city name.
        </p>
      </div>
    );
  }

  const { currentWeather, stats, hourlyForecast, weeklyForecast, environment } = data;
  const theme = getWeatherTheme(currentWeather.weatherCode, currentWeather.isDay);
  console.log(currentWeather.weatherCode)
  const videoSrc =
    !currentWeather.isDay && (theme === "sunny" || theme ==="mainlyClear")
      ? getWeatherVideoSrc("night")
      : getWeatherVideoSrc(theme);

  return (
    <div className="weather-bg">
      <video className="weather-video" autoPlay muted loop playsInline src={videoSrc} />
      <div className="weather-video-overlay" />

      <div className="relative z-10 flex justify-center px-4 py-8 md:px-8">
        <div className="w-full max-w-5xl space-y-4">
          <CurrentWeatherCard data={currentWeather} />
          <StatsCard stats={stats} />
          <EnvStatsCard env={environment} />
          <HourlyForecastCard hourlyForecast={hourlyForecast} />
          <WeeklyForecastCard weeklyForecast={weeklyForecast} />
        </div>
      </div>
    </div>
  );
}
