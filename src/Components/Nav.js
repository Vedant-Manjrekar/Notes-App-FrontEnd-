import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import WbSunnyIcon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Nav() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.theme.data);

  const theme = {
    color: globalState.data ? "white" : "black",
  };

  function toggle() {
    dispatch(
      toggleTheme({
        data: !globalState.data,
      })
    );
  }

  // console.log(globalState);

  return (
    <nav className="navbar">
      <p style={theme}>Notes App</p>
      <button
        onClick={toggle}
        style={{ marginRight: "1rem", display: "flex", alignItems: "center" }}
        className="theme-toggler"
      >
        {globalState.data ? (
          <DarkModeIcon sx={{ color: "white", transition: ".5s" }} />
        ) : (
          <WbSunnyIcon sx={{ transition: ".5s", color: "#f6c22a" }} />
        )}
      </button>
    </nav>
  );
}

export default Nav;
