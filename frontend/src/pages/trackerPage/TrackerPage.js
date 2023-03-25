import axios from "axios";
import { useEffect, useState } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";

const TrackerPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    title: "",
    value: "",
    category: "",
  });

  const allExpenses = async () => {
    const response = await axios.get(
      "http://localhost:8080/v1/api/expenses/allExpenses"
    );
    setExpenses(response.data);
  };

  useEffect(() => {
    allExpenses();
  }, []);

  return (
    <>
      <AddComponent
        newExpense={newExpense}
        setNewExpenses={setNewExpense}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <SeparatorComponent />
      <TableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
