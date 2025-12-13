import { WiHumidity, WiStrongWind, WiRaindrop } from "react-icons/wi";

const iconMap = {
  Humidity: <WiHumidity className="text-sky-300" size={28} />,
  Wind: <WiStrongWind className="text-indigo-300" size={28} />,
  "Precipitation (now)": <WiRaindrop className="text-emerald-300" size={28} />,
};

export default function StatsCard({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.9)]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80">
            {iconMap[stat.label]}
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {stat.label}
            </p>
            <p className="text-base font-semibold text-slate-50">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
