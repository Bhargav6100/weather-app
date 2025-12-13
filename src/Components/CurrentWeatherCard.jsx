// components/CurrentWeatherCard.js
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import { getTempIcon } from "@/lib/TempIcon";
function getMainIcon(code) {
  if (code === 0 || code === 1) return <WiDaySunny className="text-amber-300" size={72} />;
  if (code === 2 || code === 3) return <WiCloud className="text-sky-200" size={72} />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return <WiRain className="text-sky-300" size={72} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return <WiSnow className="text-indigo-200" size={72} />;
  return <WiCloud className="text-sky-200" size={72} />;
}

export default function CurrentWeatherCard({ data }) {
  if (!data) return null;

  return (
    <section>
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-violet-500/40 bg-slate-950/70 px-6 py-5 shadow-[0_0_40px_rgba(88,28,135,0.55)] md:flex-row md:items-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
            Weather now
          </p>
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            {data.city}, {data.country}
          </h2>
          {/* <p className="text-5xl font-semibold text-slate-50 md:text-6xl">
            {Math.round(data.temperature)}°C
          </p> */}
          <p className="flex items-center gap-2 text-4xl font-semibold">
          {getTempIcon(data.temperature)}
         {Math.round(data.temperature)}°C
         </p>
          <p className="text-sm text-slate-200">
            {data.description} ·{" "}
            <span className="font-medium">
              Feels like {Math.round(data.feelsLike)}°C
            </span>
          </p>
          <p className="text-xs text-slate-400">
            Local time: <span className="font-medium">{data.localTime}</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#050819] shadow-[0_18px_40px_rgba(15,23,42,0.9)]">
            {getMainIcon(data.weatherCode)}
          </div>
          <p className="text-xs font-medium text-slate-200">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}
