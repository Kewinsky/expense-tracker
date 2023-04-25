import ProfileComponent from "../../components/profileComponent/ProfileComponent";
const ProfilePage = ({ currentUser, serCurrentUser }) => {
  return (
    <ProfileComponent
      currentUser={currentUser}
      serCurrentUser={serCurrentUser}
    />
  );
};

export default ProfilePage;
