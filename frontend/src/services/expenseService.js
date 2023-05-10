import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = "http://localhost:8080/api/expenses/";

const getExpenseById = (id) => {
  return axios.get(API_URL + `getExpense/${id}`, { headers: authHeader() });
};

const userId = AuthService.getCurrentUser();
const getExpensesByUser = async () => {
  return await axios.get(API_URL + `getExpensesByUser/${userId.id}`, {
    headers: authHeader(),
  });
};

const getNoteByUser = async () => {
  return await axios.get(API_URL + `getNoteByUser/${userId.id}`, {
    headers: authHeader(),
  });
};

const addExpense = (expense) => {
  return axios.post(API_URL + "addExpense", expense, { headers: authHeader() });
};

const addNote = (note) => {
  return axios.post(API_URL + "addNote", note, { headers: authHeader() });
};

const updateExpense = (id, newExpense) => {
  return axios.put(API_URL + `updateExpense/${id}`, newExpense, {
    headers: authHeader(),
  });
};

const updateNote = (id, newNote) => {
  return axios.put(API_URL + `updateNote/${id}`, newNote, {
    headers: authHeader(),
  });
};

const deleteExpense = (id) => {
  return axios.delete(API_URL + `deleteExpense/${id}`, {
    headers: authHeader(),
  });
};

const ExpenseService = {
  getExpenseById,
  getExpensesByUser,
  getNoteByUser,
  addExpense,
  addNote,
  updateExpense,
  updateNote,
  deleteExpense,
};

export default ExpenseService;
