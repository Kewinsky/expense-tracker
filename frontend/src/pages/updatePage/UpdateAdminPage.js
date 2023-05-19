import UpdateAdminComponent from "../../components/updateComponent/UpdateAdminComponent";
import UserService from "../../services/userService";
import { useEffect, useState } from "react";
import SpinnerComponent from "../../components/spinnerComponent/SpinnerComponent";
import { Row } from "react-bootstrap";
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
    <div className="d-flex justify-content-center">
      <Row className="col col-md-6 m-3">
        <UpdateAdminComponent users={users} setUsers={setUsers} />
      </Row>
    </div>
  );
};

export default UpdateAdminPage;
