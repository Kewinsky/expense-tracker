import UpdateAdminComponent from "../../components/updateComponent/UpdateAdminComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
const UpdateAdminPage = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateAdminComponent users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default UpdateAdminPage;
