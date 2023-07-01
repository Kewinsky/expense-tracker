import React, { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";
import { ToastContainer } from "react-toastify";

const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState("light");
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getCurrentUserAndExpenses = async () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);

      const response = await ExpenseService.getExpensesByUser();
      setExpenses(response.data);
    }
  };

  useEffect(() => {
    getCurrentUserAndExpenses();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToastContainer />
      <Router
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={AuthService.getCurrentUser()}
        setCurrentUser={setCurrentUser}
      />
    </ThemeContext.Provider>
  );
};
export default App;
export { ThemeContext };
