const sumAllMonths = (items) => {
  const result = [];
  const groupedByMonth = items.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthName = date.toLocaleString("default", { month: "long" }); // Get month name
    if (!acc[monthName]) {
      acc[monthName] = 0; // Initialize sum for this month to 0
      result.push({ month: monthName, total: 0 }); // Add a new object to the result array
    }
    acc[monthName] += expense.value;
    const index = result.findIndex((obj) => obj.month === monthName);
    result[index].total = acc[monthName]; // Update the total for this month in the result array
    return acc;
  }, {});
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

const sumByCategory = (items, month) => {
  let sumByCategory = {};
  for (let i = 0; i < items.length; i++) {
    const category = items[i].category;
    const value = items[i].value;
    const date = new Date(items[i].date);
    const dataMonth = date.getMonth();

    if (month === null || dataMonth === month) {
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

const getSumCategories = (items, month) => {
  const sumByCategoryData = sumByCategory(items, month);
  const sortedData = sumByCategoryData.sort((a, b) => b.value - a.value);
  return sortedData;
};

const getTopCategories = (items, month, range) => {
  const sumByCategoryData = sumByCategory(items, month);
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
    subscribtion: 0,
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
      } else if (title.includes("Subscribtion")) {
        sumByTitle.subscribtion += value;
      }
    }
  }

  const result = Object.keys(sumByTitle).map((title) => {
    return { title, value: sumByTitle[title] };
  });

  return result;
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

const getSavedSumForYear = (items) => {
  let sum = 0;
  const savingsItems = items.filter((item) => item.category === "SAVINGS");

  savingsItems.forEach((item) => {
    sum += item.value;
  });

  return sum;
};

const getSavedSumByMonth = (items) => {
  const sumByMonth = {};

  // Initialize sumByMonth with zeros for each month (0-11)
  for (let i = 0; i < 12; i++) {
    sumByMonth[i] = 0;
  }

  items.forEach((item) => {
    if (item.category === "SAVINGS") {
      const month = new Date(item.date).getMonth();
      sumByMonth[month] += item.value;
    }
  });

  return sumByMonth;
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
  sumAllByMonth,
  getSumCategories,
  sumByCategory,
  getTopCategories,
  sumUtilities,
  getSavedSum,
  getSavedSumForYear,
  getSavedSumByMonth,
  getRoundedCategoryAverages,
};
