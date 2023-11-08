import { useEffect, useState, useContext } from "react";
import FilteringComponent from "../../components/filteringComponent/FilteringExpensesComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";
import { expenseFilter } from "../../helpers/filteringMethods";
import { months } from "../../utils/monthsData";
import { trackerTableHeaders } from "../../utils/tableHeaders";
import { updateExpenseURL } from "../../utils/updateURL";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { ThemeContext } from "../../App";
import CategoryService from "../../services/categoryService";
import AddExpenseComponent from "../../components/addComponent/AddExpenseComponent";
import HeaderComponent from "../../components/headerComponent/HeaderComponent";

const ExpensesPage = () => {
  const { expenses, setExpenses } = useContext(ThemeContext);
  const currentDate = new Date();

  const [categories, setCategories] = useState([]);
  const [filteringCategories, setFilteringCategories] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
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
      filteringCategories,
      filterTitle
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

  const getCategoriesByUser = async () => {
    const response = await CategoryService.getCategoriesByUser();

    setCategories(response.data);
  };

  useEffect(() => {
    filterExpenses();
  }, [filterTitle]);

  useEffect(() => {
    filterExpenses();
    getCategoriesByUser();
  }, [expenses]);

  return (
    <>
      <HeaderComponent header={"Manage Expenses"} />
      <SeparatorComponent />
      <AddExpenseComponent setExpenses={setExpenses} categories={categories} />
      <FilteringComponent
        categories={categories}
        title={filterTitle}
        setTitle={setFilterTitle}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        filteringCategories={filteringCategories}
        setFilteringCategories={setFilteringCategories}
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

export default ExpensesPage;
