import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

function getHourlyIcon(code) {
  if (code === 0 || code === 1) return <WiDaySunny className="text-amber-300" size={32} />;
  if (code === 2 || code === 3) return <WiCloud className="text-sky-200" size={32} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return <WiRain className="text-sky-300" size={32} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return <WiSnow className="text-indigo-200" size={32} />;
  if (code >= 95 && code <= 99) return <WiThunderstorm className="text-yellow-200" size={32} />;
  if (code === 45 || code === 48) return <WiFog className="text-slate-200" size={32} />;
  return <WiCloud className="text-sky-200" size={32} />;
}

function getHourlyDescription(code) {
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

function getHourlyThemeClasses(code) {
  if (code === 0 || code === 1) return "from-amber-500/35 to-orange-500/20 border-amber-300/60";
  if (code === 2 || code === 3) return "from-slate-700/60 to-slate-950/80 border-slate-400/50";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return "from-sky-500/35 to-indigo-800/60 border-sky-300/50";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return "from-indigo-300/35 to-slate-900/80 border-indigo-200/50";
  if (code >= 95 && code <= 99) return "from-purple-700/60 to-slate-950/90 border-purple-400/60";
  if (code === 45 || code === 48) return "from-slate-400/30 to-slate-900/80 border-slate-200/50";
  return "from-slate-700/60 to-slate-950/80 border-slate-400/50";
}

export default function HourlyForecastCard({ hourlyForecast }) {
  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  return (
    <section className="mt-5">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-300">
        Next hours
      </h3>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {hourlyForecast.map((h, idx) => {
          const code = typeof h.weatherCode === "number" ? h.weatherCode : null;
          const themeClasses = code != null ? getHourlyThemeClasses(code) : "from-slate-700/60 to-slate-950/80 border-slate-400/50";
          const icon = code != null ? getHourlyIcon(code) : <WiCloud className="text-sky-200" size={32} />;
          const desc = code != null ? getHourlyDescription(code) : "Forecast";

          return (
            <div
              key={`${h.time}-${idx}`}
              className={`min-w-[132px] rounded-2xl border bg-gradient-to-b px-3 py-3 text-center text-slate-50 shadow-[0_10px_24px_rgba(15,23,42,0.85)] ${themeClasses}`}
            >
              <p className="text-xs text-slate-200">{h.time}</p>

              <div className="mt-2 flex flex-col items-center gap-1">
                {icon}
                <p className="text-[0.7rem] text-slate-100">{desc}</p>
              </div>

              <p className="mt-2 text-lg font-semibold text-slate-50">
                {Math.round(h.temp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
