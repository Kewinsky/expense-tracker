import UpdateAdminComponent from "../../components/updateComponents/UpdateAdminComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../components/spinnerComponent/SpinnerComponent";
import SimplePage from "../simplePage/SimplePage";

const UpdateAdminPage = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (!users.length) {
    return <SpinnerComponent />;
  }

  return (
    <SimplePage>
      <UpdateAdminComponent users={users} />
    </SimplePage>
  );
};

export default UpdateAdminPage;
