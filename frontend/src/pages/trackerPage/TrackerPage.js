import { useEffect, useState } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import FilteringComponent from "../../components/filteringComponent/FilteringComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import ExpenseService from "../../services/expenseService";
import { expenseFilter } from "../../helpers/expenseFilter";
import { months } from "../../helpers/monthsData";
import { expenseCategories } from "../../helpers/expenseCategoriesData";
import { trackerTableHeaders } from "../../helpers/tableHeaders";
import { updateExpenseURL } from "../../helpers/updateURL";
import { useDeleteItem } from "../../hooks/useDeleteItem";

const TrackerPage = ({ expenses, setExpenses, currentUser }) => {
  const currentDate = new Date();

  const [category, setCategory] = useState([]);
  const [month, setMonth] = useState(months[currentDate.getMonth()]);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [filteredExpenses, setFilteredExpenses] = useState([]);

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
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={updateExpenseURL}
        handleDelete={handleDelete}
        configLabels={trackerTableHeaders}
        records={filteredExpenses}
        setRecords={setExpenses}
      />
    </>
  );
};

export default TrackerPage;
