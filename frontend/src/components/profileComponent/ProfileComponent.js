import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const ProfileComponent = ({ currentUser, theme }) => {
  const buttonTheme = theme === "dark" ? "light" : "dark";

  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <Link className="link-dark mx-3" to={`/update/user/${currentUser.id}`}>
        <Button variant={`outline-${buttonTheme}`}>Edit</Button>
      </Link>
    </div>
  );
};

export default ProfileComponent;
