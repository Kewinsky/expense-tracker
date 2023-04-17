import axios from "axios";
import { authHeader } from "./authHeader";

const API_URL = "http://localhost:8080/api/users/";

const getUsers = () => {
  return axios.get(API_URL + "getUsers", { headers: authHeader() });
};

const getUserById = (id) => {
  return axios.get(API_URL + `getUserById/${id}`, { headers: authHeader() });
};

const updateUser = (id, newUser) => {
  return axios.put(API_URL + `updateUser/${id}`, newUser, {
    headers: authHeader(),
  });
};

const updateUserByAdmin = (id, newUser) => {
  return axios.put(API_URL + `updateUserByAdmin/${id}`, newUser, {
    headers: authHeader(),
  });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + `deleteUser/${id}`, {
    headers: authHeader(),
  });
};

const UserService = {
  getUsers,
  getUserById,
  updateUser,
  updateUserByAdmin,
  deleteUser,
};

export default UserService;
