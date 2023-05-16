import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
const ProfileComponent = ({ currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <Link className="link-dark mx-3" to={`/update/user/${currentUser.id}`}>
        <Button variant={`outline-${reversedTheme}`}>Edit</Button>
      </Link>
    </div>
  );
};

export default ProfileComponent;
