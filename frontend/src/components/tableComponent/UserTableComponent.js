import Table from "react-bootstrap/Table";
import ActionButtonsComponent from "./ActionButtonsComponent";

const UserTableComponent = ({ users, setUsers }) => {
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
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <ActionButtonsComponent record={user} setRecords={setUsers} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTableComponent;
