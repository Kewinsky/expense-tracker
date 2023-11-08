import { reloadData } from "../helpers/reloadData";
import {
  errorNotification,
  successNotification,
} from "../helpers/toastNotifications";

export const useDeleteItem = (deleteServiceFn, fetchDataFn, setData) => {
  const deleteItem = async (itemId) => {
    try {
      const response = await deleteServiceFn(itemId);

      successNotification(response);
      reloadData(fetchDataFn, setData);
    } catch (err) {
      errorNotification(err.message);
    }
  };

  return deleteItem;
};
