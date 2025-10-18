import { createContext, useContext, useState } from "react";

const SavedCitiesContext = createContext();

export const SavedCitiesProvider = ({ children }) => {
  const [savedCities, setSavedCities] = useState(
    JSON.parse(localStorage.getItem("savedCities")) || {}
  );

  return (
    <SavedCitiesContext.Provider value={{ savedCities, setSavedCities }}>
      {children}
    </SavedCitiesContext.Provider>
  );
};

export const UseSavedCitiesContext = () => useContext(SavedCitiesContext);
