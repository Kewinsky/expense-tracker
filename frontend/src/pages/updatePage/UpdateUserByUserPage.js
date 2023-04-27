import UpdateUserByUserComponent from "../../components/updateComponent/UpdateUserByUserComponent";
const UpdateUserByUserPage = ({ currentUser, serCurrentUser }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateUserByUserComponent
          currentUser={currentUser}
          serCurrentUser={serCurrentUser}
        />
      </div>
    </div>
  );
};

export default UpdateUserByUserPage;
