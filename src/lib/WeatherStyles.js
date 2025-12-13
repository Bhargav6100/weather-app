// lib/weatherTheme.js
export function getWeatherTheme(code, isDay = true) {
  // Night override (optional)
  // SUNNY
  if (code === 0) return "sunny";

  if(code === 1) return "mainlyClear";

  // CLOUDY (including overcast)
  if (code === 2 ) return "cloudy";

  if (code === 3 ) return "overcast";

  // FOG
  if (code === 45 || code === 48) return "fog";

  // DRIZZLE + RAIN + FREEZING RAIN + SHOWERS
  // codes: 51–67 and 80–82
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return "rainy";
  }

  // SNOWFALL + SNOW GRAINS + SNOW SHOWERS
  // codes: 71–77 and 85–86
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return "snowy";
  }

  // THUNDERSTORMS (with or without hail)
  if (code === 95 || code === 96 || code === 99) {
    return "thunder";
  }

  // DEFAULT
  return "cloudy";
}
