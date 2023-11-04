import React, { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";
import { ToastContainer } from "react-toastify";
import ThemeModeService from "./services/themeModeService";

const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState(ThemeModeService.getThemeFromLS());
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
    <ThemeContext.Provider value={{ theme, setTheme, expenses, setExpenses }}>
      <ToastContainer
        hideProgressBar={true}
        pauseOnHover={false}
        theme={theme}
      />
      <Router />
    </ThemeContext.Provider>
  );
};
export default App;
export { ThemeContext };
