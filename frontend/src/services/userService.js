import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/users/";

const getUsers = async () => {
  return await axios.get(API_URL + "getUsers", {
    headers: authHeader(),
  });
};

const getUserById = async (id) => {
  try {
    return await axios.get(API_URL + `getUserById/${id}`, {
      headers: authHeader(),
    });
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const updateCurrentUser = async (id, newUser) => {
  const user = AuthService.getCurrentUser();
  user.username = newUser.username;
  user.email = newUser.email;
  localStorage.setItem("user", JSON.stringify(user));
  try {
    return await axios.put(API_URL + `updateUser/${id}`, newUser, {
      headers: authHeader(),
    });
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const updateUserByAdmin = async (id, newUser) => {
  try {
    return await axios.put(API_URL + `updateUserByAdmin/${id}`, newUser, {
      headers: authHeader(),
    });
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const deleteUser = async (id) => {
  try {
    return await axios.delete(API_URL + `deleteUser/${id}`, {
      headers: authHeader(),
    });
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const UserService = {
  getUsers,
  getUserById,
  updateCurrentUser,
  updateUserByAdmin,
  deleteUser,
};

export default UserService;
