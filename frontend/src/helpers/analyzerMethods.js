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

const getTopCategories = (items, month) => {
  const sumByCategoryData = sumByCategory(items, month);
  const sortedData = sumByCategoryData.sort((a, b) => b.value - a.value);
  return sortedData.slice(0, 5);
};

const sumUtilities = (items, month) => {
  let sumByTitle = {
    electricity: 0,
    gas: 0,
    water: 0,
    rent: 0,
    internet: 0,
    subscribtion: 0,
    other: 0,
  };

  for (let i = 0; i < items.length; i++) {
    const title = items[i].title;
    const value = items[i].value;
    const date = new Date(items[i].date);
    const dataMonth = date.getMonth();

    if (month === null || dataMonth === month) {
      if (title.includes("electricity")) {
        sumByTitle.electricity += value;
      } else if (title.includes("gas")) {
        sumByTitle.gas += value;
      } else if (title.includes("water")) {
        sumByTitle.water += value;
      } else if (title.includes("rent")) {
        sumByTitle.rent += value;
      } else if (title.includes("internet")) {
        sumByTitle.internet += value;
      } else if (title.includes("subscribtion")) {
        sumByTitle.subscribtion += value;
      } else {
        sumByTitle.other += value;
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

export {
  sumAllByMonth,
  sumByCategory,
  getTopCategories,
  sumUtilities,
  getSavedSum,
};
