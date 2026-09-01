import { Radio, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { UseSettingsContext } from "../contexts/settings-context";
import { ReactComponent as SunIcon } from "../assets/icons/sun.svg";
import { ReactComponent as CloudRainIcon } from "../assets/icons/cloud-rain.svg";
import { ReactComponent as WindIcon } from "../assets/icons/wind.svg";

export default function Settings() {
  const { settings, updateSettings } = UseSettingsContext();

  const themesList = ["system", "light", "dark"].map((theme) => {
    return (
      <div
        className="theme"
        onClick={() => handleThemeChange(theme)}
        key={theme}
      >
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
        <div className="animation-icon-container">
          <SunIcon />
        </div>
        <div className="animation-text-center">
          <h3 className="animation-title">Perfect Weather</h3>
          <p className="animation-subtitle">
            Customize your experience with Voltora's intuitive settings
          </p>
        </div>
        <div className="animation-icons-row">
          <div className="animation-icon-box animation-bounce-1">
            <CloudRainIcon />
          </div>
          <div className="animation-icon-box animation-bounce-2">
            <SunIcon />
          </div>
          <div className="animation-icon-box animation-bounce-3">
            <WindIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
