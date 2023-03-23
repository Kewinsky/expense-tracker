import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponents";

const TableComponent = () => {
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
        <tr>
          <td>01-01-2001</td>
          <td>McDonald</td>
          <td>100.00</td>
          <td>Food</td>
          <ActionButtonsComponents />
        </tr>
        <tr>
          <td>01-01-2001</td>
          <td>Water | Electricity | Gas</td>
          <td>200.00</td>
          <td>Utilities</td>
          <ActionButtonsComponents />
        </tr>
        <tr>
          <td>01-01-2001</td>
          <td>Petrol</td>
          <td>150.00</td>
          <td>Transport</td>
          <ActionButtonsComponents />
        </tr>
      </tbody>
    </Table>
  );
};

export default TableComponent;
