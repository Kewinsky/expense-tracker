import ProfileComponent from "../../components/profileComponent/ProfileComponent";
const ProfilePage = ({ currentUser, theme }) => {
  return <ProfileComponent currentUser={currentUser} theme={theme} />;
};

export default ProfilePage;
