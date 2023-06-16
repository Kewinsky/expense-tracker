export const noteFilterByYear = (items, year) => {
  return items.filter((item) => {
    return item.year === year;
  });
};
