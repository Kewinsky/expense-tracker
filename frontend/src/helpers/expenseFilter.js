export const expenseFilter = (items, month, categories) => {
  return items.filter((item) => {
    if (categories.includes("ALL")) {
      return new Date(item.date).getMonth() === month;
    }
    return (
      new Date(item.date).getMonth() === month &&
      categories.includes(item.category)
    );
  });
};
