import { useEffect, useState, useContext } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import FilteringComponent from "../../components/filteringComponent/FilteringComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";
import { expenseFilter } from "../../helpers/expenseFilter";
import { months } from "../../helpers/monthsData";
import { trackerTableHeaders } from "../../helpers/tableHeaders";
import { updateExpenseURL } from "../../helpers/updateURL";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { ThemeContext } from "../../App";
import { deserializeCategories } from "../../helpers/categoriesMapper";
import UserService from "../../services/userService";

const TrackerPage = () => {
  const { expenses, setExpenses } = useContext(ThemeContext);
  const currentDate = new Date();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = useDeleteItem(
    ExpenseService.deleteExpense,
    ExpenseService.getExpensesByUser,
    setExpenses
  );

  const filterExpenses = () => {
    const response = expenseFilter(
      expenses,
      year,
      months.indexOf(month),
      category
    );
    setError(null);
    setFilteredExpenses(response);

    if (response.length === 0) {
      setError("No data");
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  };

  const getUserCategories = async () => {
    const response = await UserService.getUserCategories();

    const mappedCategories = deserializeCategories(response.data);

    setCategories(mappedCategories);
  };

  useEffect(() => {
    filterExpenses();
    getUserCategories();
  }, [expenses]);

  return (
    <>
      <AddComponent
        expenses={expenses}
        setExpenses={setExpenses}
        categories={categories}
      />
      <FilteringComponent
        categories={categories}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        category={category}
        setCategory={setCategory}
        filterExpenses={filterExpenses}
        months={months}
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={updateExpenseURL}
        handleDelete={handleDelete}
        configLabels={trackerTableHeaders}
        records={filteredExpenses}
        setRecords={setExpenses}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default TrackerPage;
