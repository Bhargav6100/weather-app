// app/layout.js
import "./globals.css";
import SearchBar from "@/components/SearchBar";
import Aside from "@/Components/Aside";

export const metadata = {
  title: "Weather Dashboard",
  description: "Weather dashboard with city search",
};

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-[#020617] font-sans text-slate-50">
//         {/* Top navbar */}
//         <header className="flex items-center justify-between border-b border-slate-800 bg-[#04081A]/95 px-6 py-3 backdrop-blur">
//           <h1 className="text-lg font-semibold tracking-tight">
//             Weather Dashboard
//           </h1>
//           <SearchBar />
//         </header>

//         {/* Main layout */}
//         <div className="flex min-h-[calc(100vh-52px)]">
//           <Aside />

//           {/* Purple “sky” background with soft blobs */}
//           <main className="relative flex-1 overflow-y-auto bg-gradient-to-br from-[#050816] via-[#0b1024] to-[#4c1d95] px-4 py-8 md:px-10">
//             {/* decorative blobs */}
//             <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
//             <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
//             <div className="pointer-events-none absolute top-40 right-1/4 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

//             <div className="relative z-10 flex justify-center">
//               <div className="w-full max-w-5xl space-y-4">{children}</div>
//             </div>
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            padding: "1rem 2rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#020617",
            color: "white",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Weather Dashboard</h1>
          <SearchBar />
        </header>

        <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
          <Aside />
          {/* weather-bg MUST be this flex child */}
          <div className="weather-bg">
            <main className="weather-bg-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
