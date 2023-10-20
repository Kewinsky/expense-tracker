import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/expenses/";

const userId = AuthService.getCurrentUser()?.id;

const getExpensesByUser = async () => {
  return await axios
    .get(API_URL + `getExpensesByUser/${userId}`, {
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

const addExpense = async (expense) => {
  return await axios
    .post(API_URL + "addExpense", expense, {
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

const updateExpense = async (id, newExpense) => {
  return await axios
    .put(API_URL + `updateExpense/${id}`, newExpense, {
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

const deleteExpense = async (id) => {
  return await axios
    .delete(API_URL + `deleteExpense/${id}`, {
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

const ExpenseService = {
  getExpensesByUser,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default ExpenseService;
