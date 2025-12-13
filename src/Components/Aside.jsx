// components/Aside.js
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export default function Aside() {
  const [savedCities, setSavedCities] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wrapperRef = useRef(null);

  // Load saved
  useEffect(() => {
    const saved = localStorage.getItem("savedCitiesV2");
    if (saved) setSavedCities(JSON.parse(saved));
  }, []);

  // Persist saved
  useEffect(() => {
    localStorage.setItem("savedCitiesV2", JSON.stringify(savedCities));
  }, [savedCities]);

  // Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions (debounced)
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${GEO_URL}?name=${encodeURIComponent(q)}&count=8&language=en`
        );
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (e) {
        console.error(e);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  function buildLabel(c) {
    return [c.name, c.admin1, c.country].filter(Boolean).join(", ");
  }

  function saveLocation(c) {
    const label = buildLabel(c);

    // prevent duplicates by lat/lon (best unique key)
    const exists = savedCities.some(
      (x) => Number(x.latitude) === Number(c.latitude) && Number(x.longitude) === Number(c.longitude)
    );
    if (exists) {
      setQuery("");
      setIsOpen(false);
      return;
    }

    setSavedCities((prev) => [
      ...prev,
      {
        id: c.id ?? `${c.latitude},${c.longitude}`,
        name: c.name,
        admin1: c.admin1 || "",
        country: c.country || "",
        timezone: c.timezone || "auto",
        latitude: c.latitude,
        longitude: c.longitude,
        label,
      },
    ]);

    setQuery("");
    setResults([]);
    setIsOpen(false);
  }

  function removeCity(id) {
    setSavedCities((prev) => prev.filter((c) => c.id !== id));
  }

  function makeHref(city) {
    const pathLabel = city.label || [city.name, city.admin1, city.country].filter(Boolean).join(", ");

    const qs = new URLSearchParams({
      lat: String(city.latitude),
      lon: String(city.longitude),
      tz: city.timezone || "auto",
      name: city.name || "",
      admin1: city.admin1 || "",
      country: city.country || "",
    });

    return `/weather/${encodeURIComponent(pathLabel)}?${qs.toString()}`;
  }

  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-950/80 px-4 py-5 text-slate-100 md:block">
      <div ref={wrapperRef} className="space-y-2 relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Enter city..."
          autoComplete="off"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />

        {/* Dropdown */}
        {isOpen && (isLoading || results.length > 0) && (
          <div className="absolute left-0 right-0 top-[46px] z-50 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg">
            {isLoading && (
              <div className="px-3 py-2 text-xs text-slate-400">Searching…</div>
            )}

            {!isLoading &&
              results.map((c) => (
                <button
                  key={`${c.id}-${c.latitude}-${c.longitude}`}
                  type="button"
                  onMouseDown={(e) => {
                    // onMouseDown so it triggers before input blur
                    e.preventDefault();
                    saveLocation(c);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800/70"
                >
                  <div className="text-sm text-slate-100">{c.name}</div>
                  <div className="text-xs text-slate-400">
                    {[c.admin1, c.country].filter(Boolean).join(", ")}
                  </div>
                </button>
              ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            // Optional: keep this as a fallback, but it won't be "accurate"
            // Better UX: only allow saving from dropdown (recommended).
            setIsOpen(true);
          }}
          className="w-full rounded-xl bg-sky-500 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
        >
          Save city
        </button>
      </div>

      <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Locations
      </h3>

      <ul className="mt-3 space-y-1.5 text-sm">
        {savedCities.map((city) => (
          <li
            key={city.id}
            className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-800/80"
          >
            <Link href={makeHref(city)} className="flex-1 truncate text-slate-100">
              {city.label || city.name}
            </Link>
            <button
              onClick={() => removeCity(city.id)}
              className="ml-2 rounded-md border border-red-500/70 px-1.5 py-0.5 text-xs text-red-400 hover:bg-red-500/10"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
