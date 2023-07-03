import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import TableComponent from "../../components/tableComponent/TableComponent";
import { userManagementTableHeaders } from "../../helpers/tableHeaders";
import { updateUserURL } from "../../helpers/updateURL";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import AuthService from "../../services/authService";

const UserManagementPage = () => {
  const roleMapping = {
    ROLE_USER: "User",
    ROLE_ADMIN: "Admin",
    ROLE_MODERATOR: "Moderator",
  };
  const currentUser = AuthService.getCurrentUser();

  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  const simplifiedUsers = users.map((user) => {
    const roles = user.roles.map((role) => roleMapping[role.name]).join(" | ");

    return { ...user, roles };
  });

  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await UserService.getUsers();

    setError("");

    setUsers(response.data);

    if (response.length === 0) {
      setError("No data");
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
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
    <>
      <div className="m-5 text-center">
        <h3>User management</h3>
      </div>
      <SeparatorComponent />
      <TableComponent
        handleUpdate={updateUserURL}
        handleDelete={handleDelete}
        configLabels={userManagementTableHeaders}
        records={simplifiedUsers.slice(1)}
        setRecords={setUsers}
        isPending={isPending}
        error={error}
      />
    </>
  );
};

export default UserManagementPage;
