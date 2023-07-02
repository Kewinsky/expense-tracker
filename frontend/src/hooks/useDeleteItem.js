import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { reloadData } from "../helpers/reloadData";

export const useDeleteItem = (deleteServiceFn, fetchDataFn, setData) => {
  const { theme } = useContext(ThemeContext);

  const showToastMessage = (message) => {
    toast.success(message, {
      theme: theme,
    });
  };

  const showToastErrorMessage = (message) => {
    toast.error(message, {
      theme: theme,
    });
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await deleteServiceFn(itemId);
      showToastMessage(response);
      reloadData(fetchDataFn, setData);
    } catch (err) {
      showToastErrorMessage(err.message);
    }
  };

  return deleteItem;
};
