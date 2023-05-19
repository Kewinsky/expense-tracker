import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import TableComponent from "../../components/tableComponent/TableComponent";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
const UserManagementPage = ({ currentUser }) => {
  const configLabels = ["username", "email", "roles"];
  const handleUpdate = "/update/userByAdmin";

  const { theme } = useContext(ThemeContext);

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

  const showToastMessageOnDelete = () => {
    toast.success("User deleted!", {
      theme: theme,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("Something went wrong!", {
      theme: theme,
    });
  };

  const handleDelete = async (id) => {
    await UserService.deleteUser(id)
      .then(() => getAllUsers())
      .catch((err) => {
        showToastErrorMessage();
        console.log(err.response.data);
      })
      .then(() => showToastMessageOnDelete());
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
