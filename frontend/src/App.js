import React, { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";
import { ToastContainer } from "react-toastify";
import { getYearArray } from "./helpers/yearData";

const ThemeContext = React.createContext();

const App = () => {
  const expenseCategories = [
    "FOOD",
    "TRANSPORT",
    "UTILITIES",
    "PERSONAL",
    "HOUSING",
    "MEDICAL",
    "ENTERTAINMENT",
    "SAVINGS",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = getYearArray();

  const [theme, setTheme] = useState("light");
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getAllExpenses = async () => {
    const response = await ExpenseService.getExpensesByUser();

    setExpenses(response.data);
  };

  const getCurrentUser = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    getCurrentUser();
    if (AuthService.getCurrentUser()) {
      getAllExpenses();
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToastContainer />
      <Router
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={AuthService.getCurrentUser()}
        setCurrentUser={setCurrentUser}
        expenseCategories={expenseCategories}
        months={months}
        years={years}
      />
    </ThemeContext.Provider>
  );
};
export default App;
export { ThemeContext };
