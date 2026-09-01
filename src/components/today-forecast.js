import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { weatherCodeVariables } from "../utils/weather-codes";
import { UseSettingsContext } from "../contexts/settings-context";

export default function TodayForecast() {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const { settings } = UseSettingsContext();
  const { weatherInfo } = UseWeatherAppInfo();
  const { hourlyForecast } = weatherInfo;

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

  const todayForecastList = hourlyForecast.time?.map((time, index) => {
    const formattedTime = formatTime(time);
    const weatherConditionImgPath = `${
      weatherCodeVariables[hourlyForecast.weatherCode[index]]?.basePath
    }${hourlyForecast.isDay[index] ? "day" : "night"}.png`;

    return (
      <div className="today-forecast-element" key={index}>
        <p className="time">{formattedTime}</p>
        <img
          className="weather-condition-img"
          src={weatherConditionImgPath}
          alt="img"
          draggable="false"
        />
        <p className="temp">{hourlyForecast.temp[index]}°</p>
      </div>
    );
  });

  return (
    <div className="today-forecast-container weather-app-element-container">
      <p className="today-forecast-label weather-app-element-label">
        TODAY'S FORECAST
      </p>
      <div className="today-forecast-content" {...events} ref={ref}>
        {todayForecastList}
      </div>
    </div>
  );
}
