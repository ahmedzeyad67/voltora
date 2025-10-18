import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UseSettingsContext } from "./settings-context";

const WeatherAppInfoContext = createContext();

const initialState = {
  currentTemp: 0,
  weatherCondition: "Rainy Day",
  isDay: false,
  currentHighlights: {
    realFeel: 0,
    humidity: 0,
    windSpeed: 0,
    sunrise: "",
    sunset: "",
  },
  hourlyForecast: "",
  weekForecast: "",
};

export const WeatherAppInfoProvider = ({ children }) => {
  const { settings } = UseSettingsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState(initialState);

  const [selectedCity, setSelectedCity] = useState(
    JSON.parse(localStorage.getItem("selectedCity")) || {
      name: "Cairo",
      lat: "30.0626",
      long: "31.2497",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.long}&daily=sunrise,sunset,weather_code&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=1&temperature_unit=${settings.tempUnit}&wind_speed_unit=${settings.windSpeedUnit}`
          ),
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.long}&hourly=temperature_2m,weather_code,is_day&timezone=auto&forecast_days=1&temperature_unit=${settings.tempUnit}`
          ),
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${settings.tempUnit}`
          ),
        ]);

        const { current: currentData, daily: dailyData } = res1.data;
        const { hourly: hourlyData } = res2.data;
        const { daily: weeklyData } = res3.data;

        // const filterHourlyData = (arr) =>
        //   arr.filter((_, index) => index % 4 === 0);
        const roundTempArr = (arr) => arr.map((element) => Math.round(element));

        setWeatherInfo({
          currentTemp: Math.round(currentData.temperature_2m),
          weatherCode: currentData.weather_code,
          isDay: currentData.is_day,
          currentHighlights: {
            realFeel: Math.round(currentData.apparent_temperature),
            humidity: currentData.relative_humidity_2m,
            windSpeed: currentData.wind_speed_10m,
            sunrise: dailyData.sunrise,
            sunset: dailyData.sunset,
          },
          hourlyForecast: {
            time: hourlyData.time,
            temp: roundTempArr(hourlyData.temperature_2m),
            isDay: hourlyData.is_day,
            weatherCode: hourlyData.weather_code,
          },
          weekForecast: {
            date: weeklyData.time,
            maxTemp: roundTempArr(weeklyData.temperature_2m_max),
            minTemp: roundTempArr(weeklyData.temperature_2m_min),
            weatherCode: weeklyData.weather_code,
          },
        });
      } catch (err) {
        console.error("One or more APIs failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCity, settings]);

  return (
    <WeatherAppInfoContext.Provider
      value={{
        isLoading,
        weatherInfo,
        setWeatherInfo,
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </WeatherAppInfoContext.Provider>
  );
};

export const UseWeatherAppInfo = () => useContext(WeatherAppInfoContext);
