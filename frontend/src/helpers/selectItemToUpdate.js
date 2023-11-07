export const selectItemToUpdate = (items, itemId) => {
  return items.find((item) => {
    return item.id === parseInt(itemId);
  });
};
