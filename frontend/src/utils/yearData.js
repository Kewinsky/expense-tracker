// Purpose: provide data for SelectComponent for year
export const getYearArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1980; year--) {
    years.push(year);
  }
  return years;
};
