export const incomeFilter = (items, year, month) => {
  return items.filter((item) => {
    return (
      new Date(item.date).getFullYear() === year &&
      new Date(item.date).getMonth() === month
    );
  });
};
