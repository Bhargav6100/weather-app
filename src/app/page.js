// app/page.js
import CurrentWeatherCard from "@/Components/CurrentWeatherCard";
import StatsCard from "@/Components/StatsCard";
import EnvStatsCard from "@/Components/EnvStatCard";
import HourlyForecastCard from "@/Components/HourlyForecastCard";
import WeeklyForecastCard from "@/Components/WeeklyForecastCard";
import { getWeatherForCity } from "@/lib/WeatherFetcher";
import { getWeatherTheme } from "@/lib/WeatherStyles";
import { getWeatherVideoSrc } from "@/lib/WeatherVideo";

export default async function HomePage() {
  const {
    currentWeather,
    stats,
    hourlyForecast,
    weeklyForecast,
    environment,
  } = await getWeatherForCity("Montreal");

  const theme = getWeatherTheme(
    currentWeather.weatherCode,
    currentWeather.isDay
  );
    const videoSrc = (!currentWeather.isDay && theme==="sunny")?getWeatherVideoSrc("night"):getWeatherVideoSrc(theme);


  return (
      <div className="weather-bg">
      {/* Background video */}
      <video
        className="weather-video"
        autoPlay
        muted
        loop
        playsInline
        src={videoSrc}
      />

      {/* Darkening overlay so text is readable */}
      <div className="weather-video-overlay" />
     {/* <div className={(!currentWeather.isDay && theme==='sunny')?`weather-bg weather-night`:`weather-bg weather-${theme}`}> */}
      {/* <div className={`weather-overlay weather-overlay-${theme}`} /> */}
      {/* Content container */}
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
