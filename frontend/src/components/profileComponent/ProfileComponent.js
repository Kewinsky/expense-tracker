import AuthService from "../../services/authService";
const ProfileComponent = (currentUser, serCurrentUser) => {
  const user = AuthService.getCurrentUser();

  return (
    <div>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfileComponent;
