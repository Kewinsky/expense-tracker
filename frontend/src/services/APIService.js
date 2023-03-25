import axios from "axios";

const BASE_URL = "http://localhost:8080/v1/api";

export const getAllExpenses = async () => {
  return await axios.get(BASE_URL + "/allExpenses");
};
