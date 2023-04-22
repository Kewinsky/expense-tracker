const ProfileComponent = ({ currentUser, serCurrentUser }) => {
  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default ProfileComponent;
