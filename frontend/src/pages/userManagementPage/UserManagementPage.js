import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import TableComponent from "../../components/tableComponent/TableComponent";
const UserManagementPage = ({ currentUser }) => {
  const configLabels = ["username", "email", "roles"];
  const handleUpdate = "/update/userByAdmin";

  const [users, setUsers] = useState([]);

  const roleMapping = {
    ROLE_USER: "User",
    ROLE_ADMIN: "Admin",
    ROLE_MODERATOR: "Moderator",
  };

  const simplifiedUsers = users.map((user) => {
    const roles = user.roles.map((role) => roleMapping[role.name]).join(" | ");

    return { ...user, roles };
  });

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await UserService.deleteUser(id)
      .then(() => getAllUsers())
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    if (!currentUser?.roles.includes("ROLE_ADMIN")) {
      navigate("/unauthorized");
    } else {
      getAllUsers();
    }
  }, [currentUser?.roles, navigate]);

  return (
    <TableComponent
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      configLabels={configLabels}
      records={simplifiedUsers.slice(1)}
      setRecords={setUsers}
    />
  );
};

export default UserManagementPage;
