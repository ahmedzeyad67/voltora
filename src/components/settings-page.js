import {
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { UseSettingsContext } from "../contexts/settings-context";

export default function Settings() {
  const { settings, updateSettings } = UseSettingsContext();

  const themesList = ["system", "light", "dark"].map((theme) => {
    return (
      <div className="theme" onClick={() => handleThemeChange(theme)}>
        <div className={`theme-img ${theme}-theme-img`}></div>
        <div>
          <p className="theme-name">{theme}</p>
          <Radio checked={settings.theme === theme} />
        </div>
      </div>
    );
  });

  function handleThemeChange(theme) {
    updateSettings("theme", theme);
    if (theme === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  }

  return (
    <div className="settings-page-container">
      <div className="weather-app-element-container">
        <div className="settings-section">
          <p className="settings-section-title">Appearance</p>
          <div className="themes-list">{themesList}</div>
        </div>

        <div className="settings-section time-format">
          <p className="settings-section-title">Time Format</p>
          <div className="settings-card">
            <ToggleButtonGroup
              value={settings.timeFormat}
              exclusive
              onChange={(e) => updateSettings("timeFormat", e.target.value)}
              className="settings-toggle-group"
            >
              <ToggleButton value="12H" className="settings-toggle-btn">
                12H
              </ToggleButton>
              <ToggleButton value="24H" className="settings-toggle-btn">
                24H
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="settings-section">
          <p className="settings-section-title">Units</p>
          <div className="settings-card">
            <div className="settings-unit-row">
              <label className="settings-unit-label">Temperature</label>
              <ToggleButtonGroup
                value={settings.tempUnit}
                exclusive
                onChange={(e) => updateSettings("tempUnit", e.target.value)}
                className="settings-toggle-group"
              >
                <ToggleButton value="celsius" className="settings-toggle-btn">
                  Celsius
                </ToggleButton>
                <ToggleButton
                  value="fahrenheit"
                  className="settings-toggle-btn"
                >
                  Fahrenheit
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className="settings-unit-row">
              <label className="settings-unit-label">Wind Speed</label>
              <ToggleButtonGroup
                value={settings.windSpeedUnit}
                exclusive
                onChange={(e) =>
                  updateSettings("windSpeedUnit", e.target.value)
                }
                className="settings-toggle-group"
              >
                <ToggleButton value="kmh" className="settings-toggle-btn">
                  KM/H
                </ToggleButton>
                <ToggleButton value="ms" className="settings-toggle-btn">
                  M/S
                </ToggleButton>
                <ToggleButton value="mph" className="settings-toggle-btn">
                  MPH
                </ToggleButton>
                <ToggleButton value="kn" className="settings-toggle-btn">
                  Knots
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-page-animation-container">
        <div className="animation-wrapper">
          <div className="animation-content">
            <div className="animation-gradient-bg"></div>
            <div className="animation-inner">
              <div className="animation-icon-container">
                <div className="animation-sun-rotating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </div>
              </div>
              <div className="animation-text-center">
                <h3 className="animation-title">Perfect Weather</h3>
                <p className="animation-subtitle">
                  Customize your experience with Voltora's intuitive settings
                </p>
              </div>
              <div className="animation-icons-row">
                <div className="animation-icon-box animation-bounce-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud-rain"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                    <path d="M16 14v6"></path>
                    <path d="M8 14v6"></path>
                    <path d="M12 16v6"></path>
                  </svg>
                </div>
                <div className="animation-icon-box animation-bounce-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sun"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </div>
                <div className="animation-icon-box animation-bounce-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-wind"
                  >
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="animation-settings-display">
            <p className="animation-settings-label">CURRENT SETTINGS</p>
            <div className="animation-settings-values">
              <p className="animation-settings-item">
                Theme:{" "}
                <span className="animation-settings-value">
                  {settings.theme}
                </span>
              </p>
              <p className="animation-settings-item">
                Format:{" "}
                <span className="animation-settings-value">
                  {settings.timeFormat}
                </span>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
