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

export const expenseFilterByYear = (items, year) => {
  return items.filter((item) => {
    return new Date(item.date).getFullYear() === year;
  });
};

export const expenseFilterByMonth = (items, month) => {
  return items.filter((item) => {
    return new Date(item.date).getMonth() === month;
  });
};
