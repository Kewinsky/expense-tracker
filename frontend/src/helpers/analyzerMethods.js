import { months } from "./monthsData";

const sumAllMonths = (items) => {
  const result = [];

  months.forEach((monthName) => {
    result.push({ label: monthName, total: 0 });
  });

  items.forEach((expense) => {
    const date = new Date(expense.date);
    const monthName = date.toLocaleString("default", { month: "long" });

    const index = result.findIndex((obj) => obj.label === monthName);
    if (index !== -1) {
      result[index].total += expense.value;
    }
  });

  return result;
};

const sumAllByRange = (items, step) => {
  const result = [];

  for (let i = 1; i <= 31; i += step) {
    result.push({ label: i.toString(), total: 0 });
  }

  items.forEach((expense) => {
    const date = new Date(expense.date);
    const key = `${Math.floor(date.getDate() / step) * step + 1}`;

    const index = result.findIndex((obj) => obj.label === key);
    if (index !== -1) {
      result[index].total += expense.value;
    }
  });

  return result;
};

const sumAllByMonth = (items, month) => {
  let sum = 0;
  const array = items.filter((item) => {
    return new Date(item.date).getMonth() === month;
  });
  array.map((item) => (sum += item.value));
  return sum;
};

const sumByCategory = (items, year, month) => {
  let sumByCategory = {};
  for (let i = 0; i < items.length; i++) {
    const category = items[i].category;
    const value = items[i].value;
    const date = new Date(items[i].date);
    const dataYear = date.getFullYear();
    const dataMonth = date.getMonth();

    if (
      (year === null || dataYear === year) &&
      (month === null || dataMonth === month)
    ) {
      if (sumByCategory[category]) {
        sumByCategory[category] += value;
      } else {
        sumByCategory[category] = value;
      }
    }
  }

  const result = Object.keys(sumByCategory).map((category) => {
    return { category, value: sumByCategory[category] };
  });

  return result;
};

const getSumCategories = (items, year, month) => {
  const sumByCategoryData = sumByCategory(items, year, month);
  const sortedData = sumByCategoryData.sort((a, b) => b.value - a.value);
  return sortedData;
};

const getTopCategories = (items, year, month, range) => {
  const sumByCategoryData = sumByCategory(items, year, month);
  const sortedData = sumByCategoryData.sort((a, b) => b.value - a.value);
  if (range) {
    return sortedData.slice(0, range);
  }
  return sortedData;
};

const sumUtilities = (items, month) => {
  let sumByTitle = {
    electricity: 0,
    gas: 0,
    water: 0,
    rent: 0,
    subscription: 0,
  };

  for (let i = 0; i < items.length; i++) {
    const title = items[i].title;
    const value = items[i].value;
    const date = new Date(items[i].date);
    const dataMonth = date.getMonth();

    if (month === null || dataMonth === month) {
      if (title.includes("Electricity")) {
        sumByTitle.electricity += value;
      } else if (title.includes("Gas")) {
        sumByTitle.gas += value;
      } else if (title.includes("Water")) {
        sumByTitle.water += value;
      } else if (title.includes("Rent")) {
        sumByTitle.rent += value;
      } else if (title.includes("Subscription")) {
        sumByTitle.subscription += value;
      }
    }
  }

  const result = Object.keys(sumByTitle).map((title) => {
    return { title, value: sumByTitle[title] };
  });

  return result;
};

const sumUtilityByYear = (items, year, utilityToSum) => {
  const result = [];

  for (let i = 0; i < 12; i++) {
    const monthName = months[i];

    result.push({ label: monthName, total: 0 });

    for (let j = 0; j < items.length; j++) {
      const title = items[j].title.toLowerCase();
      const value = items[j].value;
      const date = new Date(items[j].date);
      const dataYear = date.getFullYear();
      const dataMonth = date.getMonth();

      if (
        dataYear === year &&
        dataMonth === i &&
        title.includes(utilityToSum.toLowerCase())
      ) {
        result[i].total += value;
      }
    }
  }

  return result;
};

const getRoundedCategoryAverages = (items, year) => {
  let sumByCategoryAndYear = {};

  for (let i = 0; i < items.length; i++) {
    const category = items[i].category;
    const value = items[i].value;
    const date = new Date(items[i].date);
    const dataYear = date.getFullYear();

    if (year === null || dataYear === year) {
      if (sumByCategoryAndYear[category]) {
        sumByCategoryAndYear[category].sum += value;
        sumByCategoryAndYear[category].count += 1;
      } else {
        sumByCategoryAndYear[category] = { sum: value, count: 1 };
      }
    }
  }

  const categoryAverages = Object.keys(sumByCategoryAndYear).map(
    (category) => ({
      category,
      average: Math.round(
        sumByCategoryAndYear[category].sum /
          sumByCategoryAndYear[category].count
      ),
    })
  );

  return categoryAverages;
};

export {
  sumAllMonths,
  sumAllByRange,
  sumAllByMonth,
  getSumCategories,
  sumByCategory,
  getTopCategories,
  sumUtilities,
  sumUtilityByYear,
  getRoundedCategoryAverages,
};
