import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
const UpdateUserPage = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    const response = UserService.getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateUserComponent reloadData={getAllUsers} users={users} />
      </div>
    </div>
  );
};

export default UpdateUserPage;
