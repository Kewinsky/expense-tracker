import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./profileComponent.scss";
import { Card, Image } from "react-bootstrap";
import userImg from "../../assets/images/user_image.png";

const ProfileComponent = ({ currentUser }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="d-flex justify-content-center m-3">
      <Card className={`bg-${theme}`}>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body>
          <div className="d-flex align-items-center">
            <Image src={userImg} width={80} height={80} />
            <div className="m-3">
              <h4 className="m-0">{currentUser.username}</h4>
              <p className="m-0">{currentUser.email}</p>
            </div>
            <Link
              className="link-dark mx-3"
              to={`/update/user/${currentUser.id}`}
            >
              <Button variant={`outline-${reversedTheme}`}>Edit</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileComponent;
