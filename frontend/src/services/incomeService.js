import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/incomes/";
const userId = AuthService.getCurrentUser()?.id;

const getIncomes = async () => {
  return await axios
    .get(API_URL + `getIncomesByUser/${userId}`, {
      headers: authHeader(),
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

const addIncome = async (income) => {
  return await axios
    .post(API_URL + "addIncome", income, {
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

const updateIncome = async (id, newIncome) => {
  return await axios
    .put(API_URL + `updateIncome/${id}`, newIncome, {
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

const deleteIncome = async (id) => {
  return await axios
    .delete(API_URL + `deleteIncome/${id}`, {
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

const IncomeService = {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
};

export default IncomeService;
