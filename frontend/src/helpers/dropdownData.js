export const dropdownData = (items) => {
  return items.map((item) => ({
    value: item,
    label: item.charAt(0) + item.slice(1).toLowerCase(),
  }));
};
