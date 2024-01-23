import { months } from "../utils/monthsData";

// Purpose: sum up values of items by month and
// return array with month name and total value
// used for preparing data for Summary Line Chart (year period)
export const sumAllMonths = (items) => {
  const result = [];

  months.forEach((monthName) => {
    result.push({ label: monthName, total: 0 });
  });

  items.forEach((item) => {
    const date = new Date(item.date);
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);

    const index = result.findIndex((obj) => obj.label === monthName);
    if (index !== -1) {
      result[index].total += item.value;
    }
  });

  return result;
};

// Purpose: sum up values of items by step and
// return array with step and total value
// used for preparing data for Summary Line Chart (month period)
export const sumAllSteps = (items, step) => {
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

// Purpose: sum up values of items by category and
// return array with category name and total value
// used for preparing data for Category Bar Chart + Category Table
export const sumAllCategories = (items, limit) => {
  let sumByCategory = {};

  for (let i = 0; i < items.length; i++) {
    const category = items[i].category;
    const value = items[i].value;

    if (sumByCategory[category]) {
      sumByCategory[category] += value;
    } else {
      sumByCategory[category] = value;
    }
  }

  const result = Object.keys(sumByCategory).map((category) => {
    return { category, value: sumByCategory[category] };
  });

  const sortedData = result.sort((a, b) => b.value - a.value);

  if (limit === null) {
    return sortedData;
  } else {
    return sortedData.slice(0, limit);
  }
};

// Purpose: sum up values of items by utility and
// return array with passed utility name and total value
// used for preparing data for Utility Line Chart
export const sumAllUtilitiesForChart = (items, utilityToSum) => {
  const result = [];

  for (let i = 0; i < 12; i++) {
    const monthName = months[i];

    result.push({ label: monthName, total: 0 });

    for (let j = 0; j < items.length; j++) {
      const title = items[j].title.toLowerCase();
      const value = items[j].value;
      const date = new Date(items[j].date);
      const dataMonth = date.getMonth();

      if (dataMonth === i && title.includes(utilityToSum.toLowerCase())) {
        result[i].total += value;
      }
    }
  }

  return result;
};

// Purpose: sum up values of items
// return integer with total value
// used for calculating total outcome/income
export const sumAll = (items) => {
  let sum = 0;
  if (!items) {
    return sum;
  }
  items.map((item) => (sum += item.value));
  return sum;
};

// Purpose: sum up values of items by month and
// return integer with total value
// used for calculating MONTH balance (income - outcome)
export const sumAllByMonth = (items, month) => {
  let sum = 0;
  const array = items.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === month;
  });
  array.map((item) => (sum += item.value));
  return sum;
};

// Purpose: sum up values of items by utility and
// return array with predefined utility name and total value
// used for preparing data for Utility Table
export const sumAllUtilitiesForTable = (items, month) => {
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
      if (title.toLowerCase().includes("electricity")) {
        sumByTitle.electricity += value;
      } else if (title.toLowerCase().includes("gas")) {
        sumByTitle.gas += value;
      } else if (title.toLowerCase().includes("water")) {
        sumByTitle.water += value;
      } else if (title.toLowerCase().includes("rent")) {
        sumByTitle.rent += value;
      } else if (title.toLowerCase().includes("subscription")) {
        sumByTitle.subscription += value;
      }
    }
  }

  const result = Object.keys(sumByTitle).map((title) => {
    return { title, value: sumByTitle[title] };
  });

  return result;
};

// Purpose: calculate average value for each category by whole year
// return array with category name and average value
// used for Category Table
export const getRoundedCategoryAverages = (items, year) => {
  const categoryData = {};

  items.forEach((item) => {
    const itemYear = new Date(item.date).getFullYear();
    const itemMonth = new Date(item.date).getMonth() + 1;

    if (itemYear === year) {
      const key = `${itemMonth}-${item.category}`;

      if (!categoryData[key]) {
        categoryData[key] = { sum: 0 };
      }

      categoryData[key].sum += item.value;
    }
  });

  const result = [];

  for (const key in categoryData) {
    const [month, category] = key.split("-");
    const sum = categoryData[key].sum;

    const existingCategory = result.find((item) => item.category === category);

    if (!existingCategory) {
      result.push({ category, totalSum: 0, numberOfMonths: 0 });
    }

    const categoryIndex = result.findIndex(
      (item) => item.category === category
    );
    result[categoryIndex].totalSum += sum;
    result[categoryIndex].numberOfMonths += 1;
  }

  const finalResult = result.map((item) => {
    const totalSum = item.totalSum;
    const numberOfMonths = item.numberOfMonths;
    const average = numberOfMonths > 0 ? totalSum / numberOfMonths : 0;
    const roundedAverage = Math.round(average * 2) / 2;

    return { category: item.category, average: roundedAverage };
  });

  return finalResult;
};
