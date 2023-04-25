import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";

const TrackerPage = ({ expenses, setExpenses, currentUser }) => {
  const configLabels = ["date", "title", "value", "category"];
  const handleUpdate = "/update/expense";

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
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        configLabels={configLabels}
        records={expenses}
        setRecords={setExpenses}
      />
    </>
  );
};

export default TrackerPage;
