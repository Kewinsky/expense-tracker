import { useState } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import FilteringComponent from "../../components/filteringComponent/FilteringComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";

const TrackerPage = ({ expenses, setExpenses, currentUser }) => {
  const configLabels = ["date", "title", "value", "category"];
  const categories = ["FOOD", "TRANSPORT", "UTILITIES"];
  const handleUpdate = "/update/expense";

  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const reloadData = async () => {
    const response = await ExpenseService.getExpensesByUser();
    setExpenses(response.data);
  };

  const handleDelete = async (id) => {
    await ExpenseService.deleteExpense(id)
      .then(() => reloadData())
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      <AddComponent
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={currentUser}
        categories={categories}
      />
      <FilteringComponent
        expenses={expenses}
        setFilteredExpenses={setFilteredExpenses}
        categories={categories}
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        configLabels={configLabels}
        records={filteredExpenses}
        setRecords={setExpenses}
      />
    </>
  );
};

export default TrackerPage;
