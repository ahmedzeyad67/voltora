import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "./searchbar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { ReactComponent as Logo } from "../assets/icons/voltora.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("");

  function toggleDrawer() {
    setDrawerIsOpen(!drawerIsOpen);
  }

  function handleBtnClick(event) {
    navigate(`/${event.currentTarget.id}`);
    setDrawerIsOpen(false);
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
      {selectedBtn === "home" && <Searchbar />}
      <button className="menu-btn" onClick={toggleDrawer}>
        <MenuIcon className="menu-icon" />
      </button>
      <Drawer open={drawerIsOpen} onClose={toggleDrawer}>
        {
          <div className="nav-links">
            <button
              id="home"
              className={selectedBtn === "home" ? "selected-btn" : ""}
              onClick={handleBtnClick}
            >
              <GridViewRoundedIcon />
              Home
              <div className="left-border"></div>
            </button>
            <button
              id="saved-cities"
              className={selectedBtn === "saved-cities" ? "selected-btn" : ""}
              onClick={handleBtnClick}
            >
              <MapRoundedIcon />
              Saved Cities
              <div className="left-border"></div>
            </button>
            <button
              id="settings"
              className={selectedBtn === "settings" ? "selected-btn" : ""}
              onClick={handleBtnClick}
            >
              <SettingsRoundedIcon />
              Settings
              <div className="left-border"></div>
            </button>
          </div>
        }
      </Drawer>
    </div>
  );
}
