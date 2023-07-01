import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../App";

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

  const reloadData = async () => {
    try {
      const response = await fetchDataFn();
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await deleteServiceFn(itemId);
      showToastMessage("Item deleted!");
      reloadData();
    } catch (err) {
      showToastErrorMessage("Something went wrong!");
      console.log(err.response.data);
    }
  };

  return deleteItem;
};
