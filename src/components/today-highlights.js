import { UseSettingsContext } from "../contexts/settings-context";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { windSpeedUnits } from "../utils/wind-speed-units";

export default function TodayHighlight() {
  const { settings } = UseSettingsContext();
  const { weatherInfo } = UseWeatherAppInfo();
  const { realFeel, humidity, windSpeed } = weatherInfo.currentHighlights;

  return (
    <div className="today-highlight-container weather-app-element-container">
      <p className="today-highlight-label weather-app-element-label">
        TODAY'S HIGHLIGHT
      </p>
      <div className="today-highlight-content">
        <div className="today-highlight-element">
          <p className="label">Real Feel</p>
          <p className="content">
            {realFeel}°{settings.tempUnit[0].toUpperCase()}
          </p>
        </div>
        <div className="today-highlight-element">
          <p className="label">Humidity</p>
          <p className="content">{humidity}%</p>
        </div>
        <div className="today-highlight-element">
          <p className="label">Wind Speed</p>
          <p className="content">
            {windSpeed} {windSpeedUnits[settings.windSpeedUnit]}
          </p>
        </div>
      </div>
    </div>
  );
}
