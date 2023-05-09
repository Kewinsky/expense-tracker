import { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";
import ThemeModeComponent from "./components/themeModeComponent/ThemeModeComponent";
import ThemeModeService from "./services/themeModeService";

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

  const handleToggleSwitch = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    ThemeModeService.setThemeMode(newTheme);
    switchThemes(newTheme);
  };

  const switchThemes = (theme) => {
    if (theme === "dark") {
      document.body.style.color = "white";
      document.body.style.backgroundColor = "#212529";
    } else {
      document.body.style.color = "black";
      document.body.style.backgroundColor = "white";
    }
  };

  const getCurrentTheme = () => {
    const storedTheme = ThemeModeService.getCurrentThemeMode();
    if (storedTheme) {
      setTheme(storedTheme);
      ThemeModeService.setThemeMode(storedTheme);
      switchThemes(storedTheme);
    }
  };

  useEffect(() => {
    getCurrentTheme();
    getCurrentUser();
    if (AuthService.getCurrentUser()) {
      getAllExpenses();
    }
  }, []);

  return (
    <>
      <ThemeModeComponent
        theme={theme}
        handleToggleSwitch={handleToggleSwitch}
      />
      <Router
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={AuthService.getCurrentUser()}
        setCurrentUser={setCurrentUser}
        expenseCategories={expenseCategories}
        months={months}
        theme={theme}
      />
    </>
  );
};
export default App;
