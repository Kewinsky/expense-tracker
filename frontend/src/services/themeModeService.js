const getThemeFromLS = () => {
  return JSON.parse(localStorage.getItem("local_theme"));
};

const setThemeToLS = (theme) => {
  localStorage.setItem("local_theme", JSON.stringify(theme));
};

const ThemeModeService = {
  getThemeFromLS,
  setThemeToLS,
};

export default ThemeModeService;
