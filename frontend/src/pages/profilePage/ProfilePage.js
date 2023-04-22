import { useNavigate } from "react-router-dom";
import ProfileComponent from "../../components/profileComponent/ProfileComponent";
const ProfilePage = ({ currentUser, serCurrentUser }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    console.log(currentUser);
    console.log("dupka");
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
