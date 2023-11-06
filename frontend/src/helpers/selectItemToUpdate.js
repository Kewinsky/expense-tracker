import AuthService from "../services/authService";

export const selectItemToUpdate = (items, itemId, navigate) => {
  let selectedItem = {};
  const userId = AuthService.getCurrentUser().id;

  selectedItem = items.find((item) => {
    return item.id === parseInt(itemId) && item.userId === userId;
  });

  if (selectedItem) {
    return selectedItem;
  } else {
    navigate("/error");
  }
};
