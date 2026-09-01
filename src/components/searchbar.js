import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UseSearchbarContext } from "../contexts/searchbar-context";
import { UseWeatherAppInfo } from "../contexts/weather-app-context";
import City from "./city";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const { setSearchedCityName, searchResults } = UseSearchbarContext();
  const { setSelectedCity } = UseWeatherAppInfo();
  const navigate = useNavigate();

  const [searchInput, setSeacrhInput] = useState("");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || [],
  );

  const [isOpen, setIsOpen] = useState(false);

  const searchedCitiesList = searchResults?.map((city, index) => {
    return (
      <City key={index} city={city} handleCitySelect={handleCitySelect}></City>
    );
  });

  const recentSearchedCitiesList = recentSearches?.map((city, index) => {
    return (
      <City key={index} city={city} handleCitySelect={handleCitySelect}></City>
    );
  });

  function handleInputChange(event) {
    setSeacrhInput(event.target.value);
    setSearchedCityName(event.target.value);
  }

  function handleClickAway() {
    setIsOpen(false);
  }

  function addToRecentSearch(searchedCity) {
    setRecentSearches((prevSearches) => {
      let recentSearchesTemp = [...prevSearches];
      const searchedCityIndex = prevSearches.findIndex(
        (city) => JSON.stringify(city) === JSON.stringify(searchedCity),
      );
      if (searchedCityIndex !== -1) {
        recentSearchesTemp.splice(searchedCityIndex, 1);
      }
      recentSearchesTemp.unshift(searchedCity);
      if (recentSearchesTemp.length > 5) recentSearchesTemp.pop();
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearchesTemp),
      );
      return recentSearchesTemp;
    });
  }

  function handleCitySelect(event, city) {
    if (event.target.closest("button")) return;
    setSelectedCity(city);
    localStorage.setItem("selectedCity", JSON.stringify(city));
    addToRecentSearch(city);
    setSeacrhInput("");
    setSearchedCityName("");
    setIsOpen(false);
    navigate("/home");
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="search-container">
        <input
          value={searchInput}
          className="search-bar"
          placeholder="Search for cities"
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
        />
        <SearchIcon className="search-icon" />
        {isOpen && (
          <div className="search-result-container">
            {searchInput.length < 1 ? (
              <div className="recent-searches">
                <p className="recent-search-title">Recent Searches</p>
                {recentSearches.length ? (
                  <div className="searched-list-container">
                    {recentSearchedCitiesList}
                  </div>
                ) : (
                  <div className="no-result-found">No recent searches</div>
                )}
              </div>
            ) : searchedCitiesList?.length ? (
              <div className="searched-list-container">
                {searchedCitiesList}
              </div>
            ) : (
              <div className="no-result-found">No results found</div>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
