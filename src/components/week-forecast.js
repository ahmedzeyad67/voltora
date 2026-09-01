import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { weatherCodeVariables } from "../utils/weather-codes";

export default function WeekForecast() {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const { weatherInfo } = UseWeatherAppInfo();
  const { weekForecast } = weatherInfo;

  function formatWeekDay(date) {
    const day = new Date(date);
    return day.toLocaleDateString("en-US", { weekday: "short" });
  }

  const weekForecastList = weekForecast.date?.map((date, index) => {
    const day = index ? formatWeekDay(date) : "Today";
    const weatherCondition =
      weatherCodeVariables[weekForecast.weatherCode[index]]?.condition;
    const weatherConditionImgPath = `${
      weatherCodeVariables[weekForecast.weatherCode[index]]?.basePath
    }day.png`;
    return (
      <div className="week-forecast-element">
        <p className="day">{day}</p>
        <div className="weather-condition">
          <img
            className="weather-condition-img"
            src={weatherConditionImgPath}
            alt="img"
            draggable="false"
          />
          <p className="text">{weatherCondition}</p>
        </div>
        <p className="temp">
          <span className="min">{weekForecast.minTemp[index]}°</span>
          <span className="max">/{weekForecast.maxTemp[index]}°</span>
        </p>
      </div>
    );
  });

  return (
    <div className="week-forecast-container weather-app-element-container">
      <p className="week-forecast-label weather-app-element-label">
        7-DAYS FORECAST
      </p>
      <div className="week-forecast-content" {...events} ref={ref}>
        {weekForecastList}
      </div>
    </div>
  );
}
