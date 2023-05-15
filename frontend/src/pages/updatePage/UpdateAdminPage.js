import UpdateAdminComponent from "../../components/updateComponent/UpdateAdminComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../components/spinnerComponent/SpinnerComponent";
const UpdateAdminPage = ({ theme }) => {
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
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateAdminComponent users={users} setUsers={setUsers} theme={theme} />
      </div>
    </div>
  );
};

export default UpdateAdminPage;
