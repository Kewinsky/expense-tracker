import { useNavigate } from "react-router-dom";
import ProfileComponent from "../../components/profileComponent/ProfileComponent";
const ProfilePage = ({ currentUser, serCurrentUser }) => {
  const navigate = useNavigate();

  // TODO: navigate does not work
  if (!currentUser) {
    navigate("/login");
  }

  if (!currentUser) return null;

  return (
    <ProfileComponent
      currentUser={currentUser}
      serCurrentUser={serCurrentUser}
    />
  );
};

export default ProfilePage;
