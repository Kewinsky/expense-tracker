export const getYearArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1980; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};
