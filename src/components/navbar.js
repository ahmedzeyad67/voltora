import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./logo";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBtn, setSelectedBtn] = useState("home");

  function handleBtnClick(event) {
    navigate(`/${event.currentTarget.id}`);
  }

  useEffect(() => {
    setSelectedBtn(location.pathname.slice(1) || "home");
  }, [location]);

  return (
    <div className="navbar">
      <div className="logo-container">
        <div id="home" className="logo" onClick={handleBtnClick}>
          <Logo />
          <p style={{ fontWeight: "500" }}>Voltora</p>
        </div>
      </div>
      <div className="nav-links">
        <button
          id="home"
          className={selectedBtn === "home" ? "selected-btn" : ""}
          onClick={handleBtnClick}
        >
          <GridViewRoundedIcon />
          <div className="left-border"></div>
        </button>
        <button
          id="saved-cities"
          className={selectedBtn === "saved-cities" ? "selected-btn" : ""}
          onClick={handleBtnClick}
        >
          <MapRoundedIcon />
          <div className="left-border"></div>
        </button>
        <button
          id="settings"
          className={selectedBtn === "settings" ? "selected-btn" : ""}
          onClick={handleBtnClick}
        >
          <SettingsRoundedIcon />
          <div className="left-border"></div>
        </button>
      </div>
    </div>
  );
}
