import { Radio, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
        <div className="themes-list">{themesList}</div>
        <div>
          <ToggleButtonGroup
            value={settings.timeFormat}
            exclusive
            onChange={(e) => updateSettings("timeFormat", e.target.value)}
          >
            <ToggleButton value="12H">12H</ToggleButton>
            <ToggleButton value="24H">24H</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <ToggleButtonGroup
            value={settings.tempUnit}
            exclusive
            onChange={(e) => updateSettings("tempUnit", e.target.value)}
          >
            <ToggleButton value="celsius">Celsius</ToggleButton>
            <ToggleButton value="fahrenheit">Fahrenheit</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <ToggleButtonGroup
            value={settings.windSpeedUnit}
            exclusive
            onChange={(e) => updateSettings("windSpeedUnit", e.target.value)}
          >
            <ToggleButton value="kmh">km/h</ToggleButton>
            <ToggleButton value="ms">m/s</ToggleButton>
            <ToggleButton value="mph">mph</ToggleButton>
            <ToggleButton value="kn">Knots</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
}
