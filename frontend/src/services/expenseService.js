import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "http://localhost:8080/api/expenses/";

const getExpenses = () => {
  return axios.get(API_URL + "getExpenses", { headers: authHeader() });
};

const getExpenseById = (id) => {
  return axios.get(API_URL + "getExpense/${id}", { headers: authHeader() });
};

const getExpenseByUser = (id) => {
  return axios.get(API_URL + "getExpenseByUser/${id}", {
    headers: authHeader(),
  });
};

const addExpense = (id, expense) => {
  return axios.post(API_URL + "addExpense", expense, { headers: authHeader() });
};

const updateExpense = (id, newExpense) => {
  return axios.put(API_URL + "updateExpense/${id}", newExpense, {
    headers: authHeader(),
  });
};

const deleteExpense = (id) => {
  return axios.delete(API_URL + "deleteExpense/${id}", {
    headers: authHeader(),
  });
};

const ExpenseService = {
  getExpenses,
  getExpenseById,
  getExpenseByUser,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default ExpenseService;
