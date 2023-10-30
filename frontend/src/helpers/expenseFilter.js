export const expenseFilter = (items, year, month, category, title) => {
  return items.filter((item) => {
    return (
      isYearMonthMatch(item, year, month) &&
      isCategoryMatch(item, category) &&
      isTitleMatch(item, title)
    );
  });
};

const isYearMonthMatch = (item, year, month) => {
  const itemDate = new Date(item.date);
  return itemDate.getFullYear() === year && itemDate.getMonth() === month;
};

const isCategoryMatch = (item, category) => {
  return (
    category === null || !category.length || category.includes(item.category)
  );
};

const isTitleMatch = (item, title) => {
  return (
    !title ||
    title.trim() === "" ||
    item.title.toLowerCase().includes(title.toLowerCase())
  );
};

export const filterByYear = (items, year) => {
  return items.filter((item) => {
    return new Date(item.date).getFullYear() === year;
  });
};

export const filterByMonthAndYear = (items, year, month) => {
  return items.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getFullYear() === year && itemDate.getMonth() === month;
  });
};
