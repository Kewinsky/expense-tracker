import { useMemo, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponent";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import "./sortableTableComponent.scss";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../App";

const useSortableData = (recordsList, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedRecords = useMemo(() => {
    let sortableRecords = [...recordsList];
    if (sortConfig !== null) {
      sortableRecords.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRecords;
  }, [recordsList, sortConfig]);

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

  return { sortedRecords, requestSort, sortConfig };
};

const TableComponent = ({
  configLabels,
  handleUpdate,
  handleDelete,
  records,
  isPending,
  error,
}) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const { sortedRecords, requestSort, sortConfig } = useSortableData(records);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  if (isPending) {
    return <SpinnerComponent />;
  } else if (error) {
    return <div className="text-center m-5">{error}</div>;
  }

  return (
    <Table responsive striped bordered hover size="md" variant={theme}>
      <thead>
        <tr>
          {configLabels.map((label) => (
            <th key={label}>
              <Button
                type="button"
                onClick={() => requestSort(label)}
                className={getClassNamesFor(label)}
                variant={`outline-${reversedTheme}`}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Button>
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedRecords.map((record) => (
          <tr key={record.id}>
            {configLabels.map((label) => (
              <td key={configLabels.indexOf(label)}>{record[label]}</td>
            ))}
            <ActionButtonsComponents
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              record={record}
              theme={reversedTheme}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
