import AuthService from "../services/authService";

export const selectItemToUpdate = (items, itemId) => {
  const userId = AuthService.getCurrentUser().id;

  return items.find((item) => {
    return item.id === parseInt(itemId) && item.userId === userId;
  });
};
