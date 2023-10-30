export const dropdownData = (items) => {
  return items.map((item) => ({
    value: item,
    label: item === -1 ? "All" : item,
  }));
};

export const dropdownCategory = (items) => {
  return items.map((item) => ({
    id: item.id,
    value: item.title,
    label: item.title,
  }));
};
