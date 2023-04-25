import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
const UpdateUserPage = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (!users.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateUserComponent users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default UpdateUserPage;
