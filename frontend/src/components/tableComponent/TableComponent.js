import Table from "react-bootstrap/Table";
import ActionButtonsComponents from "./ActionButtonsComponent";
import UserService from "../../services/userService";

const TableComponent = ({ records, setRecords }) => {
  const reloadData = async () => {
    const response = await UserService.getUsers();
    setRecords(response.data);
  };

  const handleDelete = async (id) => {
    await UserService.deleteUser(id)
      .then(() => reloadData())
      .then(() => {
        console.log("record deleted");
      })
      .catch((err) => console.log(err));
  };

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
            <td>{record.roles.map((role) => role.name).join(", ")}</td>
            <ActionButtonsComponents
              handleDelete={handleDelete}
              record={record}
              setExpenses={setRecords}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
