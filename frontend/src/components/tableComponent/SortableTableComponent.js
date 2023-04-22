import { useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponent";
import "./sortableTableComponent.scss";

const useSortableData = (expensesList, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedExpenses = useMemo(() => {
    let sortableExpenses = [...expensesList];
    if (sortConfig !== null) {
      sortableExpenses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableExpenses;
  }, [expensesList, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { sortedExpenses, requestSort, sortConfig };
};

const SortableTableComponent = ({ expenses, setExpenses }) => {
  const { sortedExpenses, requestSort, sortConfig } = useSortableData(expenses);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <Table striped bordered hover size="md">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("date")}
              className={getClassNamesFor("date")}
            >
              Date
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("title")}
              className={getClassNamesFor("title")}
            >
              Title
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("value")}
              className={getClassNamesFor("value")}
            >
              Value
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("category")}
              className={getClassNamesFor("category")}
            >
              Category
            </button>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedExpenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.title}</td>
            <td>{expense.value}</td>
            <td>{expense.category}</td>
            <ActionButtonsComponents
              expense={expense}
              setExpenses={setExpenses}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortableTableComponent;
