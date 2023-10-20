import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/auth/";

const register = async (username, email, password) => {
  return await axios
    .post(API_URL + "signup", {
      username,
      email,
      password,
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      username,
      password,
    });
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const forgotPassword = async (newPassword) => {
  return await axios
    .put(API_URL + "forgotPassword", newPassword)
    .then((res) => {
      return res.data.message;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error("Server is not responding. Please try again later.");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) ?? undefined;
};

const AuthService = {
  register,
  login,
  forgotPassword,
  logout,
  getCurrentUser,
};

export default AuthService;
