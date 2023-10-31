import { toast } from "react-toastify";

// Purpose: show success notification
export const successNotification = (message) => {
  toast.success(message);
};

// Purpose: show error notification
export const errorNotification = (message) => {
  toast.error(message);
};
