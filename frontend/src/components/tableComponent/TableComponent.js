import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponents";

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

export default TableComponent;
