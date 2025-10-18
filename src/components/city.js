import { IconButton } from "@mui/material";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { UseSavedCitiesContext } from "../contexts/saved-cities-context";

export default function City({ city, handleCitySelect }) {
  const { savedCities, setSavedCities } = UseSavedCitiesContext();
  const cityKey = `${city.name};${city.location}`;

  let countryCode = city.countryCode?.toLowerCase() || "xx";
  if (countryCode === "il") countryCode = "ps";

  function handleSaveBtn(city) {
    const savedCitiesTemp = { ...savedCities };
    if (savedCities[cityKey]) {
      delete savedCitiesTemp[cityKey];
      setSavedCities(savedCitiesTemp);
    } else {
      savedCitiesTemp[cityKey] = {
        name: city.name,
        countryCode: city.countryCode,
        lat: city.lat,
        long: city.long,
        location: city.location,
      };
      setSavedCities(savedCitiesTemp);
    }
    localStorage.setItem("savedCities", JSON.stringify(savedCitiesTemp));
  }

  return (
    <div className="city" onClick={(event) => handleCitySelect(event, city)}>
      <div className="city-details">
        <div>
          <span className={`fi fi-${countryCode} fis country-flag`}></span>
          <p className="cityname">
            {city.name === "Israel" ? "Palestine" : city.name}
          </p>
        </div>
        <p className="city-location">{city.location}</p>
      </div>
      <div className="city-action-btns">
        <IconButton size="large" onClick={() => handleSaveBtn(city)}>
          {savedCities[cityKey] ? (
            <BookmarkRoundedIcon fontSize="inherit" />
          ) : (
            <BookmarkBorderRoundedIcon fontSize="inherit" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
