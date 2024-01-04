// Purpose: filter items by year, month, category and title
// return array with filtered items
// used for filtering incomes/expenses in IncomesPage/ExpensesPage
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
  return (
    itemDate.getFullYear() === year &&
    (month === -1 || itemDate.getMonth() === month)
  );
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

// Purpose: filter items by year and month
// return array with filtered items
// used for filtering expenses/incomes
export const filterByYearAndMonth = (items, year, month) => {
  return items.filter((item) => {
    const itemDate = new Date(item.date);
    const yearMatches = itemDate.getFullYear() === year;
    const monthMatches = month === null || itemDate.getMonth() === month;
    return yearMatches && monthMatches;
  });
};

// Purpose: filter notes by year
// return array with filtered notes
// used for filtering notes only
// *(Note.java model stores year and month separately,
// not whole LocalDate like in Expense or Income,
// there is no need to store day of note,
// therefore it is handled with different approach)
export const noteFilterByYear = (items, year) => {
  return items.filter((item) => {
    return item.year === year;
  });
};
