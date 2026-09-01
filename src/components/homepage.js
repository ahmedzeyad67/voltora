import CityTemp from "./city-temp";
import TodayForecast from "./today-forecast";
import TodayHighlight from "./today-highlights";
import SunsetSunrise from "./sunset-sunrise";
import WeekForecast from "./week-forecast";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import { CircularProgress } from "@mui/material";

export default function HomePage() {
  const { isLoading } = UseWeatherAppInfo();

  if (isLoading) return <CircularProgress className="loading" size={60} />;

  return (
    <div className="homepage-container">
      <div>
        <CityTemp />
        <TodayForecast />
        <div className="highlights-suntimes-container">
          <TodayHighlight />
          <SunsetSunrise />
        </div>
      </div>
      <WeekForecast />
    </div>
  );
}
