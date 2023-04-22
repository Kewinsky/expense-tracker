import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import TableComponent from "../../components/tableComponent/TableComponent";
const UserManagementPage = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  // TODO: navigate does not work
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const role = user?.roles || [];

    if (!user) {
      navigate("/login");
    } else if (!role.includes("ROLE_ADMIN")) {
      navigate("/unauthorized");
    } else {
      getAllUsers();
    }
  }, []);

  return <TableComponent records={users} setRecords={setUsers} />;
};

export default UserManagementPage;
