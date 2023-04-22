import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableComponent = ({ records, setRecords }) => {
  return (
    <Table striped bordered hover size="md">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.username}</td>
            <td>{record.email}</td>
            <td>ROLES</td>
            <td>
              <Link className="link-dark mx-3">
                <Button variant="outline-dark">Edit</Button>
              </Link>
              <Button variant="outline-dark" type="submit">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
