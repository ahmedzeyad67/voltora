import WeatherApp from "./components/weather-app";
import { SearchbarProvider } from "./contexts/searchbar-context";
import { WeatherAppInfoProvider } from "./contexts/weather-app-context";
import { SavedCitiesProvider } from "./contexts/saved-cities-context";
import { SettingsProvider } from "./contexts/settings-context";

export default function App() {
  return (
    <SettingsProvider>
      <SearchbarProvider>
        <WeatherAppInfoProvider>
          <SavedCitiesProvider>
            <WeatherApp />
          </SavedCitiesProvider>
        </WeatherAppInfoProvider>
      </SearchbarProvider>
    </SettingsProvider>
  );
}
