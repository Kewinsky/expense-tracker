import { useState, useEffect } from "react";
import Router from "./routes/Router";
import ExpenseService from "./services/expenseService";
import AuthService from "./services/authService";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const getAllExpenses = async (id) => {
    const response = await ExpenseService.getExpensesByUser(id);

    setExpenses(response.data);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      getAllExpenses(user.id);
    }
  }, []);

  return (
    <Router
      expenses={expenses}
      setExpenses={setExpenses}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  );
};
export default App;
