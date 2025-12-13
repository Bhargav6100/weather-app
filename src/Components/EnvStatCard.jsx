import {
  WiSmoke,
  WiDaySunny,
  WiMoonAltWaxingCrescent4,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";

function formatTimeLabel(iso) {
  if (!iso) return "--:--";
  // "2025-12-09T07:23" -> "07:23"
  return iso.split("T")[1]?.slice(0, 5) ?? iso;
}

export default function EnvStatsCard({ env }) {
  if (!env) return null;

  const { aqi, aqiCategory, uvIndex, sunrise, sunset, isDay } = env;

  return (
    <section className="mt-4">
      <div className="grid gap-3 md:grid-cols-3">
        {/* AQI */}
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/50 bg-slate-950/70 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.9)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
            <WiSmoke className="text-emerald-300" size={28} />
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-200/90">
              Air quality
            </p>
            <p className="text-sm font-semibold text-slate-50">
              {aqi != null ? `AQI ${Math.round(aqi)} · ${aqiCategory}` : "No data"}
            </p>
          </div>
        </div>

        {/* UV Index */}
        <div className="flex items-center gap-3 rounded-2xl border border-amber-400/50 bg-slate-950/70 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.9)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15">
            <WiDaySunny className="text-amber-300" size={28} />
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-amber-200/90">
              UV index
            </p>
            <p className="text-sm font-semibold text-slate-50">
              {uvIndex != null ? uvIndex.toFixed(1) : "--"}
              <span className="ml-1 text-xs font-normal text-slate-300">
                {uvIndex == null
                  ? ""
                  : uvIndex < 3
                  ? "(Low)"
                  : uvIndex < 6
                  ? "(Moderate)"
                  : uvIndex < 8
                  ? "(High)"
                  : uvIndex < 11
                  ? "(Very high)"
                  : "(Extreme)"}
              </span>
            </p>
          </div>
        </div>

        {/* Sunrise / Sunset + Day/Night */}
        <div className="flex items-center gap-3 rounded-2xl border border-sky-400/50 bg-slate-950/70 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.9)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15">
            {isDay ? (
              <WiDaySunny className="text-sky-200" size={26} />
            ) : (
              <WiMoonAltWaxingCrescent4 className="text-indigo-200" size={26} />
            )}
          </div>
          <div className="flex flex-col gap-1 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <WiSunrise className="text-amber-200" size={18} />
              <span>Sunrise</span>
              <span className="font-semibold text-slate-50">
                {formatTimeLabel(sunrise)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <WiSunset className="text-orange-300" size={18} />
              <span>Sunset</span>
              <span className="font-semibold text-slate-50">
                {formatTimeLabel(sunset)}
              </span>
            </div>
            <p className="mt-1 text-[0.7rem] text-slate-300">
              Currently:{" "}
              <span className="font-semibold">
                {isDay ? "Daytime" : "Nighttime"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
