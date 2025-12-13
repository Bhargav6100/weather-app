// components/WeeklyForecastCard.js
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

function getDayIcon(code) {
  if (code === 0 || code === 1) return <WiDaySunny className="text-amber-300" size={32} />;
  if (code === 2 || code === 3) return <WiCloud className="text-sky-200" size={32} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return <WiRain className="text-sky-300" size={32} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return <WiSnow className="text-indigo-200" size={32} />;
  if (code >= 95 && code <= 99) return <WiThunderstorm className="text-yellow-200" size={32} />;
  if (code === 45 || code === 48) return <WiFog className="text-slate-200" size={32} />;
  return <WiCloud className="text-sky-200" size={32} />; // fallback
}

function getDayDescription(code) {
  if (code === 0 || code === 1) return "Clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Storm";
  return "Mixed";
}

function getDayThemeClasses(code) {
  // background + border depending on weather
  if (code === 0 || code === 1) {
    // sunny / clear
    return "from-amber-500/35 to-orange-500/20 border-amber-300/70";
  }
  if (code === 2 || code === 3) {
    // cloudy
    return "from-slate-700/70 to-slate-950/80 border-slate-400/70";
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    // rainy
    return "from-sky-500/40 to-indigo-800/60 border-sky-300/70";
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    // snowy
    return "from-indigo-300/40 to-slate-900/80 border-indigo-200/70";
  }
  if (code >= 95 && code <= 99) {
    // thunderstorm
    return "from-purple-700/70 to-slate-950/90 border-purple-400/80";
  }
  if (code === 45 || code === 48) {
    // fog
    return "from-slate-400/40 to-slate-900/80 border-slate-200/70";
  }
  // fallback
  return "from-slate-700/70 to-slate-950/80 border-slate-400/70";
}

export default function WeeklyForecastCard({ weeklyForecast }) {
  if (!weeklyForecast || weeklyForecast.length === 0) return null;

  return (
    <section className="mt-6 mb-2">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-300">
        7-day forecast
      </h3>

      {/* HORIZONTAL pills */}
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {weeklyForecast.map((d, idx) => {
          const code = d.weatherCode ?? null;
          const icon = code != null ? getDayIcon(code) : null;
          const desc = code != null ? getDayDescription(code) : "Forecast";
          const themeClasses =
            code != null
              ? getDayThemeClasses(code)
              : "from-slate-700/70 to-slate-950/80 border-slate-400/70";

          return (
            <div
              key={`${d.day}-${idx}`}
              className={`min-w-[130px] rounded-2xl border bg-gradient-to-b px-3 py-3 text-slate-50 shadow-[0_10px_24px_rgba(15,23,42,0.85)] ${themeClasses}`}
            >
              {/* Day */}
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-200/90">
                {d.day}
              </p>

              {/* Icon + description */}
              <div className="mt-2 flex flex-col items-center gap-1">
                {icon}
                <p className="text-[0.7rem] text-slate-100">{desc}</p>
              </div>

              {/* Temps */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="text-left">
                  <p className="text-[0.6rem] uppercase tracking-wide text-slate-200/80">
                    min
                  </p>
                  <p className="font-semibold text-sky-100">
                    {Math.round(d.min)}°C
                  </p>
                </div>
                <div className="h-7 w-px bg-slate-200/30" />
                <div className="text-right">
                  <p className="text-[0.6rem] uppercase tracking-wide text-slate-200/80">
                    max
                  </p>
                  <p className="font-semibold text-amber-100">
                    {Math.round(d.max)}°C
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
