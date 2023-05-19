const getCurrentThemeMode = () => {
  return JSON.parse(localStorage.getItem("local_theme"));
};

const setThemeMode = (theme) => {
  localStorage.setItem("local_theme", JSON.stringify(theme));
};

const ThemeModeService = {
  getCurrentThemeMode,
  setThemeMode,
};

export default ThemeModeService;
