import { useState, useEffect } from "react";
import Router from "./routes/Router";
import axios from "axios";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const allExpenses = async () => {
    const response = await axios.get(
      "http://localhost:8080/v1/api/expenses/allExpenses"
    );
    setExpenses(response.data);
  };

  useEffect(() => {
    allExpenses();
  }, []);

  return <Router expenses={expenses} setExpenses={setExpenses} />;
};

export default App;
