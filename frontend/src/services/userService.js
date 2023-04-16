import axios from "axios";
import { authHeader } from "./authHeader";

const TEST_URL = "http://localhost:8080/api/test/";

const getUserBoard = () => {
  return axios.get(TEST_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(TEST_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(TEST_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
