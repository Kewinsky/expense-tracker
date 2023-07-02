import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
import "./updatePage.scss";

const UpdateUserPage = ({ currentUser }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <UpdateUserComponent currentUser={currentUser} />
      </div>
    </div>
  );
};

export default UpdateUserPage;
