import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "../../components/profileComponent/ProfileComponent";
import AuthService from "../../services/authService";
const ProfilePage = (currentUser, serCurrentUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: refactor using currentUser instead invoking same method
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }

    console.log(currentUser.currentUser);
  }, []);

  return (
    <ProfileComponent
      currentUser={currentUser}
      serCurrentUser={serCurrentUser}
    />
  );
};

export default ProfilePage;
