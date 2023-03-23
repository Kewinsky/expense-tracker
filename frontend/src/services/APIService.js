import axios from "axios";

const url = "http://localhost:8080/v1/api";

export const allExpenses = async () => {
  const expenses = [];
  return await axios
    .get(url + "/allExpenses", {
      expenses: expenses,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
