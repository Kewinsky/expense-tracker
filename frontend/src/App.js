import { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";

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
    <Router
      expenses={expenses}
      setExpenses={setExpenses}
      currentUser={AuthService.getCurrentUser()}
      setCurrentUser={setCurrentUser}
      expenseCategories={expenseCategories}
    />
  );
};
export default App;
