import UpdateUserComponent from "../../components/updateComponents/UpdateUserComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../components/spinnerComponent/SpinnerComponent";
import SimplePage from "../simplePage/SimplePage";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    if (!currentUser?.roles.includes("ROLE_ADMIN")) {
      navigate("/unauthorized");
    } else {
      getUsers();
    }
  }, []);

  if (!users.length) {
    return <SpinnerComponent />;
  }

  return (
    <SimplePage>
      <UpdateUserComponent users={users} />
    </SimplePage>
  );
};

export default UpdateUserPage;
