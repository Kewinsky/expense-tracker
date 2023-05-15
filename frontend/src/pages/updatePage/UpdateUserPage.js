import UpdateUserComponent from "../../components/updateComponent/UpdateUserComponent";
const UpdateUserPage = ({ currentUser, serCurrentUser, theme }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateUserComponent
          currentUser={currentUser}
          serCurrentUser={serCurrentUser}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default UpdateUserPage;
