import { UseSettingsContext } from "../contexts/settings-context";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { weatherCodeVariables } from "../utils/weather-codes";

export default function CityTemp() {
  const { settings } = UseSettingsContext();
  const { weatherInfo, selectedCity } = UseWeatherAppInfo();
  const { weatherCode, isDay, currentTemp } = weatherInfo;

  function formatDate(date) {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const dateParts = date
      .toLocaleDateString("en-US", options)
      .replaceAll(",", "")
      .split(" ");
    return `${dateParts[0]}, ${dateParts[2]} ${dateParts[1]} ${dateParts[3]}`;
  }

  const now = new Date();
  const date = formatDate(now);

  const weatherCondition = weatherCodeVariables[weatherCode]?.condition;
  const weatherConditionImgPath = `${
    weatherCodeVariables[weatherCode]?.basePath
  }${isDay ? "day" : "night"}.png`;

  return (
    <div className="city-temp-container">
      <div className="city-temp-content">
        <p className="cityname">
          {selectedCity.name}
          <span className="date">{date}</span>
        </p>
        <p className="temp">
          {currentTemp}
          <span className="temp-unit">
            °{settings.tempUnit[0].toUpperCase()}
          </span>
          <span className="weather-condition">{weatherCondition}</span>
        </p>
      </div>
      <img
        className="weather-condition-img"
        src={weatherConditionImgPath}
        alt=""
      />
    </div>
  );
}
