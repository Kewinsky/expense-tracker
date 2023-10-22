export const expenseFilter = (items, year, month, category) => {
  return items.filter((item) => {
    if (category === null || !category.length) {
      return (
        new Date(item.date).getFullYear() === year &&
        new Date(item.date).getMonth() === month
      );
    }
    return (
      new Date(item.date).getFullYear() === year &&
      new Date(item.date).getMonth() === month &&
      category.includes(item.category)
    );
  });
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
