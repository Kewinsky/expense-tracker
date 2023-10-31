// Purpose: prepare data for SelectComponent
export const dropdownData = (items) => {
  return items.map((item) => ({
    value: item,
    label: item,
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
