import Navbar from "./navbar";
import HomePage from "./homepage";
import SavedCitiesPage from "./saved-cities-page";
import Settings from "./settings-page";
import { Routes, Route, useLocation } from "react-router-dom";

export default function WeatherApp() {
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";

  return (
    <div className="page-container">
      <div
        className={`weather-app-container ${
          isSettingsPage ? "settings-page-weather-app-container" : ""
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/saved-cities" element={<SavedCitiesPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}
