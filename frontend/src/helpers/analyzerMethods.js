/*

- sumAllByMonth() return [{month: January, value: 100}, {}, {}]
- sumByCategory() return [{category: Food, value: 100}, {}, {}]
- getTopCategories() filtering above array

*/

const sumAllByMonth = (items, month) => {
  let sum = 0;
  const array = items.filter((item) => {
    return new Date(item.date).getMonth() === month;
  });
  array.map((item) => (sum += item.value));
  return sum;
};

const sumByCategory = () => {
  return null;
};

const getTopCategories = (items, month) => {
  let sum = 0;
  const array = items.filter((item) => {
    return new Date(item.date).getMonth() === month;
  });
  array.map((item) => (sum += item.value));
  return sum;
};

const getSavedSum = (items, month) => {
  let sum = 0;
  const array = items.filter((item) => {
    return (
      new Date(item.date).getMonth() === month && item.category === "SAVINGS"
    );
  });
  array.map((item) => (sum += item.value));
  return sum;
};

export { sumAllByMonth, sumByCategory, getTopCategories, getSavedSum };
