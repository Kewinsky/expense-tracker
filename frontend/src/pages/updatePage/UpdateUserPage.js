import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
const UpdateUserPage = ({ currentUser, serCurrentUser }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateUserComponent
          currentUser={currentUser}
          serCurrentUser={serCurrentUser}
        />
      </div>
    </div>
  );
};

export default UpdateUserPage;
