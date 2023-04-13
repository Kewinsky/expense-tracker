import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import SortableTableComponent from "../../components/tableComponent/SortableTableComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseService from "../../services/expenseService";

const TrackerPage = ({ expenses, setExpenses }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    ExpenseService.getExpenses().then(
      (response) => {
        setContent(response.data);
      },
      () => {
        navigate("/login");
      }
    );
  }, []);
  return (
    <>
      <AddComponent expenses={expenses} setExpenses={setExpenses} />
      <SeparatorComponent />
      <SortableTableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
