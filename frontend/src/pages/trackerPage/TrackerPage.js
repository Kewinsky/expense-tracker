import { useEffect, useState } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import FilteringComponent from "../../components/filteringComponent/FilteringComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";
import { expenseFilter } from "../../helpers/expenseFilter";

const TrackerPage = ({
  expenses,
  setExpenses,
  currentUser,
  expenseCategories,
  months,
  theme,
}) => {
  const configLabels = ["date", "title", "value", "category"];
  const handleUpdate = "/update/expense";
  const currentDate = new Date();

  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
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

  const filterExpenses = () => {
    const response = expenseFilter(expenses, months.indexOf(month), category);
    setFilteredExpenses(response);
  };

  useEffect(() => {
    filterExpenses();
  }, [expenses]);

  return (
    <>
      <AddComponent
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={currentUser}
        categories={expenseCategories}
      />
      <FilteringComponent
        categories={expenseCategories}
        month={month}
        setMonth={setMonth}
        category={category}
        setCategory={setCategory}
        filterExpenses={filterExpenses}
        months={months}
        theme={theme}
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        configLabels={configLabels}
        records={filteredExpenses}
        setRecords={setExpenses}
        theme={theme}
      />
    </>
  );
};

export default TrackerPage;
