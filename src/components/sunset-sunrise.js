import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { UseSettingsContext } from "../contexts/settings-context";

export default function SunsetSunrise() {
  const { settings } = UseSettingsContext();
  const { weatherInfo } = UseWeatherAppInfo();
  const { isDay, currentHighlights } = weatherInfo;

  function formatTime(time) {
    const date = new Date(time);
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");

    if (settings.timeFormat === "12H") {
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      return `${hours}:${minutes} ${period}`;
    }
    return `${hours}:${minutes}`;
  }

  const sunset = formatTime(currentHighlights.sunset);
  const sunrise = formatTime(currentHighlights.sunrise);

  return (
    <div className="sunset-sunrise-container weather-app-element-container">
      <p className="sunset-sunrise-label weather-app-element-label">
        {isDay ? "SUNSET" : "SUNRISE"}
      </p>
      <div className="sunset-sunrise-content">
        <p className="event-time">{isDay ? sunset : sunrise}</p>
        <img
          className="sunset-sunrise-img"
          src={isDay ? "/images/sunset.svg" : "/images/sunrise.svg"}
          alt="Sunset/Sunrise"
        />
        <p className="opposite-event-time">
          {isDay ? `Sunrise: ${sunrise}` : `Sunset: ${sunset}`}
        </p>
      </div>
    </div>
  );
}
