import { useContext } from "react";
import ThemeModeService from "../../services/themeModeService";
import { ThemeContext } from "../../App";
import "./darkModeComponent.scss";

const DarkModeComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    ThemeModeService.setThemeToLS(newTheme);
  };

  return (
    <div className="toggle-switch">
      <label className="myLabel">
        <input
          type="checkbox"
          className="myInput"
          checked={theme === "dark" ? true : false}
          onChange={handleToggle}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DarkModeComponent;
