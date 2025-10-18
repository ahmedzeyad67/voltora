import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      theme: "system",
      timeFormat: "12H",
      tempUnit: "celsius",
      windSpeedUnit: "kmh",
      // language: "en",
    }
  );

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  function updateSettings(key, value) {
    setSettings({ ...settings, [key]: value });
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const UseSettingsContext = () => useContext(SettingsContext);
