// // // components/SearchBar.js
// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function SearchBar() {
// //   const [city, setCity] = useState("");
// //   const router = useRouter();

// //   function handleSubmit(e) {
// //     e.preventDefault();
// //     const trimmed = city.trim();
// //     if (!trimmed) return;

// //     // navigate to /weather/<city>
// //     router.push(`/weather/${encodeURIComponent(trimmed.toLowerCase())}`);
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
// //       <input
// //         type="text"
// //         placeholder="Search city..."
// //         value={city}
// //         onChange={(e) => setCity(e.target.value)}
// //         style={{
// //           padding: "0.5rem 1rem",
// //           minWidth: "260px",
// //           borderRadius: "999px",
// //           border: "1px solid #ddd"
// //         }}
// //       />
// //       <button
// //         type="submit"
// //         style={{
// //           padding: "0.5rem 1rem",
// //           borderRadius: "999px",
// //           border: "none",
// //           background: "#111827",
// //           color: "white",
// //           cursor: "pointer"
// //         }}
// //       >
// //         Search
// //       </button>
// //     </form>
// //   );
// // }
// // components/SearchBar.js
// // components/SearchBar.js
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

// const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

// export default function SearchBar() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const wrapperRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch suggestions when query changes (debounced)
//   useEffect(() => {
//     const q = query.trim();

//     if (q.length < 2) {
//       setResults([]);
//       setIsOpen(false);
//       return;
//     }

//     const timeoutId = setTimeout(async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `${GEO_URL}?name=${encodeURIComponent(q)}&count=6&language=en`
//         );
//         const data = await res.json();
//         setResults(data.results || []);
//         setIsOpen(true);
//       } catch (err) {
//         console.error("Geocoding error:", err);
//         setResults([]);
//         setIsOpen(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const trimmed = query.trim();
//      console.log(trimmed)
//     if (!trimmed) return;

//     // fallback: just search what the user typed
//     router.push(`/weather/${encodeURIComponent(trimmed)}`);
//     setIsOpen(false);
//   }

//   function handleSelect(c) {
//   const name = c.name; // e.g. "London"
//   const params = new URLSearchParams({
//     lat: String(c.latitude),
//     lon: String(c.longitude),
//     tz: c.timezone || "auto",
//     country: c.country || "",
//     admin1: c.admin1 || "",
//   });

//   // show nice label in input (optional)
//   setQuery([c.name, c.admin1, c.country].filter(Boolean).join(", "));
//   setIsOpen(false);
//   router.push(
//   `/weather/${encodeURIComponent(`${r.name}, ${r.admin1}, ${r.country}`)}`
//   + `?lat=${r.latitude}&lon=${r.longitude}`
//   + `&tz=${encodeURIComponent(r.timezone || "auto")}`
//   + `&name=${encodeURIComponent(r.name)}`
//   + `&admin1=${encodeURIComponent(r.admin1 || "")}`
//   + `&country=${encodeURIComponent(r.country || "")}`
// )
// }
// console.log(query)
//   return (
//     <div
//       ref={wrapperRef}
//       style={{ position: "relative", width: "320px", maxWidth: "100%" }}
//     >
//       {/* INPUT + BUTTON (your old layout, upgraded) */}
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
//       >
//         <input
//           type="text"
//           placeholder="Search city..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           autoComplete="off"
//           style={{
//             flex: 1,
//             padding: "0.5rem 0.9rem",
//             borderRadius: "999px",
//             border: "1px solid #4b5563",
//             background: "#020617",
//             color: "white",
//             fontSize: "0.9rem",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "0.5rem 1.2rem",
//             borderRadius: "999px",
//             border: "none",
//             background: "#0f172a",
//             color: "white",
//             cursor: "pointer",
//             fontSize: "0.9rem",
//           }}
//         >
//           Search
//         </button>
//       </form>

//       {/* DROPDOWN SUGGESTIONS */}
//       {isOpen && (results.length > 0 || isLoading) && (
//         <ul
//           style={{
//             position: "absolute",
//             top: "105%",
//             left: 0,
//             right: 0,
//             marginTop: "0.25rem",
//             background: "#020617",
//             borderRadius: "0.75rem",
//             border: "1px solid #4b5563",
//             listStyle: "none",
//             padding: "0.25rem 0",
//             maxHeight: "260px",
//             overflowY: "auto",
//             zIndex: 50,
//           }}
//         >
//           {isLoading && (
//             <li
//               style={{
//                 padding: "0.4rem 0.75rem",
//                 fontSize: "0.85rem",
//                 color: "#9ca3af",
//               }}
//             >
//               Searching…
//             </li>
//           )}

//           {results.map((c) => (
//             <li
//               key={`${c.id}-${c.latitude}-${c.longitude}`}
//               onMouseDown={(e) => {
//                 // onMouseDown so click works before blur
//                 e.preventDefault();
//                 handleSelect(c);
//               }}
//               style={{
//                 padding: "0.4rem 0.75rem",
//                 cursor: "pointer",
//                 fontSize: "0.9rem",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#111827")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundColor = "transparent")
//               }
//             >
//               <span style={{ color: "white" }}>{c.name}</span>
//               <span
//                 style={{
//                   color: "#9ca3af",
//                   fontSize: "0.8rem",
//                   marginTop: "2px",
//                 }}
//               >
//                 {[c.admin1, c.country].filter(Boolean).join(", ")}
//               </span>
//             </li>
//           ))}

//           {!isLoading && results.length === 0 && (
//             <li
//               style={{
//                 padding: "0.4rem 0.75rem",
//                 fontSize: "0.85rem",
//                 color: "#9ca3af",
//               }}
//             >
//               No matches
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const router = useRouter();
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
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

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${GEO_URL}?name=${encodeURIComponent(q)}&count=8&language=en`
        );
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (err) {
        console.error("Geocoding error:", err);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
     if (selected) {
    handleSelect(selected);
    return;
  }
    const trimmed = query.trim();
    if (!trimmed) return;

    // fallback (less accurate): name-only URL
    router.push(`/weather/${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  }

// function handleSelect(c) {
//   const label = [c.name, c.admin1, c.country].filter(Boolean).join(", ");

//   setQuery(label);
//   setIsOpen(false);

//   const qs = new URLSearchParams({
//     lat: String(c.latitude),
//     lon: String(c.longitude),
//     tz: c.timezone || "auto",
//     name: c.name || "",
//     admin1: c.admin1 || "",
//     country: c.country || "",
//   });

//   router.push(`/weather/${encodeURIComponent(label)}?${qs.toString()}`);
// }
function handleSelect(c) {
  const pathLabel = [c.name, c.admin1, c.country].filter(Boolean).join(", ");
    setSelected(c);
    setQuery(pathLabel);
  setIsOpen(false);
  router.push(
    `/weather/${encodeURIComponent(pathLabel)}` +
      `?lat=${c.latitude}&lon=${c.longitude}` +
      `&tz=${encodeURIComponent(c.timezone || "auto")}` +
      `&name=${encodeURIComponent(c.name)}` +
      `&admin1=${encodeURIComponent(c.admin1 || "")}` +
      `&country=${encodeURIComponent(c.country || "")}`
  );

}


  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "320px", maxWidth: "100%" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);}}
          autoComplete="off"
          style={{
            flex: 1,
            padding: "0.5rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            background: "#020617",
            color: "white",
            fontSize: "0.9rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: "999px",
            border: "none",
            background: "#0f172a",
            color: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Search
        </button>
      </form>

      {isOpen && (results.length > 0 || isLoading) && (
        <ul
          style={{
            position: "absolute",
            top: "105%",
            left: 0,
            right: 0,
            marginTop: "0.25rem",
            background: "#020617",
            borderRadius: "0.75rem",
            border: "1px solid #4b5563",
            listStyle: "none",
            padding: "0.25rem 0",
            maxHeight: "260px",
            overflowY: "auto",
            zIndex: 50,
          }}
        >
          {isLoading && (
            <li style={{ padding: "0.4rem 0.75rem", fontSize: "0.85rem", color: "#9ca3af" }}>
              Searching…
            </li>
          )}

          {results.map((c) => (
            <li
              key={`${c.id}-${c.latitude}-${c.longitude}`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(c);
              }}
              style={{
                padding: "0.4rem 0.75rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#111827")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span style={{ color: "white" }}>{c.name}</span>
              <span style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "2px" }}>
                {[c.admin1, c.country].filter(Boolean).join(", ")}
              </span>
            </li>
          ))}

          {!isLoading && results.length === 0 && (
            <li style={{ padding: "0.4rem 0.75rem", fontSize: "0.85rem", color: "#9ca3af" }}>
              No matches
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
