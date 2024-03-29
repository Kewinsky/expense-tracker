import { useMemo, useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponent";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import "./tableComponent.scss";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../App";
import SelectComponent from "../selectComponent/SelectComponent";
import { dropdownData } from "../../helpers/dropdownData";
import PaginationComponent from "./PaginationComponent";

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
  const availableLimits = [5, 10, 20, 40];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages =
    itemsPerPage === -1 ? 1 : Math.ceil(records.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex =
    itemsPerPage === -1 ? records.length : startIndex + itemsPerPage;
  const currentData = records.slice(startIndex, endIndex);

  const { sortedRecords, requestSort, sortConfig } =
    useSortableData(currentData);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [records]);

  if (isPending) {
    return <SpinnerComponent />;
  } else if (error) {
    return <div className="text-center m-5">{error}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectLimit = (e) => {
    setItemsPerPage(e.value);
    setCurrentPage(1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between flex-grow-1">
      <div>
        <Form.Group className="d-flex justify-content-end align-items-end mb-3">
          <Form.Label className="m-0 mx-3 align-self-center">
            Items per page:
          </Form.Label>
          <SelectComponent
            options={dropdownData(availableLimits)}
            value={{
              value: itemsPerPage,
              label: itemsPerPage,
            }}
            handleSelect={handleSelectLimit}
            placeholder={"Select"}
            theme={`${theme}Theme`}
          />
        </Form.Group>
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
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default TableComponent;
