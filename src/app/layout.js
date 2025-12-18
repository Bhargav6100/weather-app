// app/layout.js
import "./globals.css";
import SearchBar from "@/Components/SearchBar";
import Aside from "@/Components/Aside";

export const metadata = {
  title: "Weather Dashboard",
  description: "Weather dashboard with city search",
};
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
