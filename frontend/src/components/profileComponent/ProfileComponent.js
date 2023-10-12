import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./profileComponent.scss";
import { Card, Col, Image, Row } from "react-bootstrap";
import userImg from "../../assets/images/user_image.png";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";

const ProfileComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();
  const categories = UserService.getUserCategories();

  console.log(categories);

  return (
    <div className="d-flex justify-content-center m-3">
      <Card className={`bg-${theme}`}>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex col-12 col-md-8 align-items-center">
              <Image src={userImg} width={80} height={80} />
              <div className="mx-3">
                <h4 className="m-0">{currentUser.username}</h4>
                <p className="m-0">{currentUser.email}</p>
              </div>
            </Col>
            <Col className="col-12 col-md-4 text-center align-self-center">
              <Link to={`/update/user/${currentUser.id}`}>
                <Button variant={`outline-${reversedTheme}`}>Edit</Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileComponent;
