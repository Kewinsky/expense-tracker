import { useEffect, useState, useContext } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import FilteringComponent from "../../components/filteringComponent/FilteringComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";
import { expenseFilter } from "../../helpers/expenseFilter";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";

const TrackerPage = ({
  expenses,
  setExpenses,
  currentUser,
  expenseCategories,
  months,
  years,
}) => {
  const configLabels = ["date", "title", "value", "category"];
  const handleUpdate = "/update/expense";
  const currentDate = new Date();

  const { theme } = useContext(ThemeContext);

  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const reloadData = async () => {
    const response = await ExpenseService.getExpensesByUser();
    setExpenses(response.data);
  };

  const showToastMessageOnDelete = () => {
    toast.success("Expense deleted!", {
      theme: theme,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("Something went wrong!", {
      theme: theme,
    });
  };

  const handleDelete = async (id) => {
    await ExpenseService.deleteExpense(id)
      .then(() => reloadData())
      .catch((err) => {
        showToastErrorMessage();
        console.log(err.response.data);
      })
      .then(() => showToastMessageOnDelete());
  };

  const filterExpenses = () => {
    const response = expenseFilter(
      expenses,
      year,
      months.indexOf(month),
      category
    );
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
        year={year}
        setYear={setYear}
        category={category}
        setCategory={setCategory}
        filterExpenses={filterExpenses}
        months={months}
        years={years}
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
