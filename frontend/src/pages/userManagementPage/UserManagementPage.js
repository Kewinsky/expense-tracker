import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import UserTableComponent from "../../components/tableComponent/UserTableComponent";
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  // TODO: currentUser
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const role = user.roles;

    if (!user) {
      navigate("/login");
    } else if (!role.includes("ROLE_ADMIN")) {
      navigate("/unauthorized");
    } else {
      getAllUsers();
      console.log(users);
    }
  });

  return <UserTableComponent users={users} setUsers={setUsers} />;
};

export default UserManagementPage;
