import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
import { Row } from "react-bootstrap";
const UpdateUserPage = ({ currentUser, serCurrentUser }) => {
  return (
    <div className="d-flex justify-content-center">
      <Row className="col col-md-6 m-3">
        <UpdateUserComponent
          currentUser={currentUser}
          serCurrentUser={serCurrentUser}
        />
      </Row>
    </div>
  );
};

export default UpdateUserPage;
