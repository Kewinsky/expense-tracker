// Purpose: prepare data for SelectComponent from any 1D array
export const dropdownData = (items) => {
  return items.map((item) => ({
    value: item,
    label: item,
  }));
};

// Purpose: prepare data for SelectComponent for periods
export const dropdownPeriod = (items) => {
  return items.map((item) => ({
    value: item,
    label: item + "D",
  }));
};

// Purpose: prepare data for SelectComponent for categories
export const dropdownCategory = (items) => {
  return items.map((item) => ({
    id: item.id,
    value: item.title,
    label: item.title,
  }));
};
