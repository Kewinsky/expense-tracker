import { useEffect, useContext } from "react";
import ThemeModeService from "../../services/themeModeService";
import { ThemeContext } from "../../App";
import "./darkModeComponent.scss";

const DarkModeComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === "dark" ? true : false;

  const handleToggleSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    ThemeModeService.setThemeMode(newTheme);
    switchThemes(newTheme);
  };

  const switchThemes = (theme) => {
    if (theme === "dark") {
      document.body.style.color = "white";
      document.body.style.backgroundColor = "#212529";
    } else {
      document.body.style.color = "black";
      document.body.style.backgroundColor = "white";
    }
  };

  const getCurrentTheme = () => {
    const storedTheme = ThemeModeService.getCurrentThemeMode();
    if (storedTheme) {
      setTheme(storedTheme);
      ThemeModeService.setThemeMode(storedTheme);
      switchThemes(storedTheme);
    }
  };

  useEffect(() => {
    getCurrentTheme();
  }, [theme]);

  return (
    <div className="toggle-switch">
      <label className="myLabel">
        <input
          type="checkbox"
          className="myInput"
          checked={isDark}
          onChange={handleToggleSwitch}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkModeComponent;
