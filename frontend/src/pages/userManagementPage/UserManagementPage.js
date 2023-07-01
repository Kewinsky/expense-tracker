import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import TableComponent from "../../components/tableComponent/TableComponent";
import { userManagementTableHeaders } from "../../helpers/tableHeaders";
import { updateUserURL } from "../../helpers/updateURL";
import { useDeleteItem } from "../../hooks/useDeleteItem";

const UserManagementPage = ({ currentUser }) => {
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

  const getUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  const handleDelete = useDeleteItem(
    UserService.deleteUser,
    UserService.getUsers,
    setUsers
  );

  useEffect(() => {
    if (!currentUser?.roles.includes("ROLE_ADMIN")) {
      navigate("/unauthorized");
    } else {
      getUsers();
    }
  }, []);

  return (
    <TableComponent
      handleUpdate={updateUserURL}
      handleDelete={handleDelete}
      configLabels={userManagementTableHeaders}
      records={simplifiedUsers.slice(1)}
      setRecords={setUsers}
    />
  );
};

export default UserManagementPage;
