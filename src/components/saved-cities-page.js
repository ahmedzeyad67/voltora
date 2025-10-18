import { useNavigate } from "react-router-dom";
import { UseSavedCitiesContext } from "../contexts/saved-cities-context";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import City from "./city";
import Searchbar from "./searchbar";

export default function SavedCitiesPage() {
  const { savedCities } = UseSavedCitiesContext();
  const { setSelectedCity } = UseWeatherAppInfo();

  const navigate = useNavigate();

  function handleCitySelect(event, city) {
    if (event.target.closest("button")) return;
    console.log({ city });
    setSelectedCity(city);
    localStorage.setItem("selectedCity", JSON.stringify(city));
    navigate("/home");
  }

  const searchedCitiesList = Object.values(savedCities)?.map((city) => {
    return <City city={city} handleCitySelect={handleCitySelect}></City>;
  });

  return (
    <div className="saved-cities-page-container">
      <Searchbar />
      <div className="saved-cities-container weather-app-element-container">
        <p className="saved-cities-label weather-app-element-label">
          SAVED CITIES
        </p>
        {searchedCitiesList.length ? (
          <div className="saved-cities-list">{searchedCitiesList}</div>
        ) : (
          <p className="no-saved-cities">No Saved Cities</p>
        )}
      </div>
    </div>
  );
}
