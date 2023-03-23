import Table from "react-bootstrap/Table";
import TableElementComponent from "./TableElementComponent";

const TableComponent = ({ expenses, setExpenses }) => {
  return (
    <Table striped bordered hover size="md">
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Value</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <TableElementComponent
            key={expense.id}
            expense={expense}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        ))}
        <TableElementComponent />
      </tbody>
    </Table>
  );
};

export default TableComponent;
