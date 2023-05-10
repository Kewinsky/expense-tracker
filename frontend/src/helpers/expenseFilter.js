export const expenseFilter = (items, month, category) => {
  return items.filter((item) => {
    if (category === null) {
      return new Date(item.date).getMonth() === month;
    }
    return (
      new Date(item.date).getMonth() === month &&
      category.includes(item.category)
    );
  });
};
