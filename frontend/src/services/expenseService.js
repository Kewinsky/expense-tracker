import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "http://localhost:8080/api/expenses/";

const getExpenses = () => {
  return axios.get(API_URL + "getExpenses", { headers: authHeader() });
};

const getExpenseById = (id) => {
  return axios.get(API_URL + `getExpense/${id}`, { headers: authHeader() });
};

const getExpensesByUser = async (id) => {
  return await axios.get(API_URL + `getExpensesByUser/${id}`, {
    headers: authHeader(),
  });
};

const addExpense = (expense) => {
  return axios.post(API_URL + "addExpense", expense, { headers: authHeader() });
};

const updateExpense = (id, newExpense) => {
  return axios.put(API_URL + `updateExpense/${id}`, newExpense, {
    headers: authHeader(),
  });
};

const deleteExpense = (id) => {
  return axios.delete(API_URL + `deleteExpense/${id}`, {
    headers: authHeader(),
  });
};

const ExpenseService = {
  getExpenses,
  getExpenseById,
  getExpensesByUser,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default ExpenseService;
