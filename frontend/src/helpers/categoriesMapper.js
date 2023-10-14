export const deserializeCategories = (categories) => {
  return categories
    .slice(1, -1)
    .split(", ")
    .map((item) => item.trim());
};

export const serializeCategories = (categories) => {
  const outputString =
    "[" + categories.map((item) => item.trim()).join(", ") + "]";
  return outputString;
};
