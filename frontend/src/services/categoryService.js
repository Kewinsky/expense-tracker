import axios from "axios";
import AuthService from "./authService";
import { authHeader } from "./authHeader";

const API_URL = process.env.REACT_APP_API_URL + "/categories/";

const getCategoriesByUser = async () => {
  const user = await AuthService.getCurrentUser();

  return await axios
    .get(API_URL + `getCategoriesByUser/${user.id}`, {
      headers: authHeader(),
    })
    .catch((err) => {
      if (err.response.status === 401) {
        AuthService.logout();
        window.location = "/login";
      } else if (err.response) {
        throw new Error(err.response.data);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const addCategory = async (category) => {
  return await axios
    .post(API_URL + "addCategory", category, {
      headers: authHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const updateCategory = async (id, newCategory) => {
  return await axios
    .put(API_URL + `updateCategory/${id}`, newCategory, {
      headers: authHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const deleteCategory = async (id) => {
  return await axios
    .delete(API_URL + `deleteCategory/${id}`, {
      headers: authHeader(),
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      if (err) {
        throw new Error(err.response.data);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const CategoryService = {
  getCategoriesByUser,
  addCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
