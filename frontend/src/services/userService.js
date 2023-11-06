import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/users/";

const getUsers = async () => {
  return await axios
    .get(API_URL + "getUsers", {
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

const updateCurrentUser = async (newUser) => {
  const user = await AuthService.getCurrentUser();

  user.username = newUser.username;
  user.email = newUser.email;

  localStorage.setItem("user", JSON.stringify(user));

  return await axios
    .put(API_URL + `updateUser/${user.id}`, newUser, {
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

const updateUserByAdmin = async (id, newUser) => {
  return await axios
    .put(API_URL + `updateUserByAdmin/${id}`, newUser, {
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

const deleteUser = async (id) => {
  return await axios
    .delete(API_URL + `deleteUser/${id}`, {
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

const UserService = {
  getUsers,
  updateCurrentUser,
  updateUserByAdmin,
  deleteUser,
};

export default UserService;
