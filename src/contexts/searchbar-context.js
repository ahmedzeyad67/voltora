import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SearchbarContext = createContext();

export const SearchbarProvider = ({ children }) => {
  const [searchedCityName, setSearchedCityName] = useState("");
  const [searchResults, setSeacrhResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchedCityName}&count=100&language=en`
        );
        const seen = new Set();

        const uniqueResults = res.data.results
          ?.filter((result) => {
            const identifier = `${result.name}-${result.country_code}-${result.timezone}-${result.admin1}`;
            if (seen.has(identifier)) {
              return false;
            }
            seen.add(identifier);
            return true;
          })
          .map((result) => ({
            name: result.name,
            countryCode: result.country_code,
            lat: result.latitude,
            long: result.longitude,
            location: [result.admin1, result.admin2, result.admin3]
              .filter(Boolean)
              .join(", "),
          }));

        setSeacrhResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setSeacrhResults([]);
    if (searchedCityName < 2) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCityName]);

  return (
    <SearchbarContext.Provider
      value={{
        setSearchedCityName,
        searchResults,
      }}
    >
      {children}
    </SearchbarContext.Provider>
  );
};

export const UseSearchbarContext = () => useContext(SearchbarContext);
