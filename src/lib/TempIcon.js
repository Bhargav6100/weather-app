// lib/TempIcon.js
import {
  FaTemperatureLow,
  FaTemperatureQuarter,
  FaTemperatureHalf,
  FaTemperatureThreeQuarters,
  FaTemperatureHigh,
} from "react-icons/fa6";

export function getTempIcon(tempC) {
  if (tempC <= 5) {
    return (
      <span className="flex items-center gap-1">
        <span className="emoji-pulse text-3xl">🥶</span> <FaTemperatureLow size={18} color="#60a5fa" />
      </span>
    );
  }

  if (tempC <= 15) {
    return (
      <span className="flex items-center gap-1">
        <span className="emoji-pulse text-3xl">🌬️</span> <FaTemperatureQuarter size={18} color="#3b82f6" />
      </span>
    );
  }

  if (tempC <= 25) {
    return (
      <span className="flex items-center gap-1">
       <span className="emoji-pulse text-3xl">😊</span>  <FaTemperatureHalf size={18} color="#facc15" />
      </span>
    );
  }

  if (tempC <= 32) {
    return (
      <span className="flex items-center gap-1">
        <span className="emoji-pulse text-3xl">🔥</span> <FaTemperatureThreeQuarters size={18} color="#fb923c" />
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1">
      <span className="emoji-pulse text-3xl">☀️</span> <FaTemperatureHigh size={18} color="#ef4444" />
    </span>
  );
}
