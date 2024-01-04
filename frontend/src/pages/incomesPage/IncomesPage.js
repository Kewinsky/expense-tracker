import React, { useEffect, useState } from "react";
import AddIncomeComponent from "../../components/addComponent/AddIncomeComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";
import IncomeService from "../../services/incomeService";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { incomesTableHeaders } from "../../utils/tableHeaders";
import { updateIncomeURL } from "../../utils/updateURL";
import { months } from "../../utils/monthsData";
import FilteringIncomesComponent from "../../components/filteringComponent/FilteringIncomesComponent";
import { expenseFilter } from "../../helpers/filteringMethods";
import HeaderComponent from "../../components/headerComponent/HeaderComponent";

const IncomesPage = () => {
  const currentDate = new Date();

  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(months[currentDate.getMonth()]);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    setIncomes(response.data);
  };

  const handleDelete = useDeleteItem(
    IncomeService.deleteIncome,
    IncomeService.getIncomes,
    setIncomes
  );

  const filterIncomes = () => {
    const response = expenseFilter(
      incomes,
      year,
      months.indexOf(month),
      null,
      filterTitle
    );

    setError(null);
    setFilteredIncomes(response);

    if (response.length === 0) {
      setError("No data");
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  };

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    filterIncomes();
  }, [filterTitle, incomes]);

  return (
    <>
      <HeaderComponent header={"Manage Incomes"} />
      <SeparatorComponent />
      <AddIncomeComponent setIncomes={setIncomes} />
      <FilteringIncomesComponent
        title={filterTitle}
        setTitle={setFilterTitle}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        months={months}
        filterIncomes={filterIncomes}
      />
      <SeparatorComponent />
      <TableComponent
        handleUpdate={updateIncomeURL}
        handleDelete={handleDelete}
        configLabels={incomesTableHeaders}
        records={filteredIncomes}
        setRecords={setIncomes}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default IncomesPage;
