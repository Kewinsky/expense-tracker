import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./profileComponent.scss";
import { Card, Col, Image, Row } from "react-bootstrap";
import userImg from "../../assets/images/user_image.png";
import AuthService from "../../services/authService";

const ProfileComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="d-flex justify-content-center m-3">
      <Card className={`bg-${theme} card-width`}>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body className="m-4">
          <div className="mb-5 text-center">
            <Image src={userImg} height={80} />
          </div>
          <Row className="mb-5 ">
            <Col className="d-flex align-items-center">
              <div>
                <h4 className="m-0">{currentUser.username}</h4>
                <p className="m-0">{currentUser.email}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={`/update/user/${currentUser.id}`}>
                <Button variant={`outline-${reversedTheme}`}>Edit</Button>
              </Link>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex align-items-center">
              <h4 className="m-0">Categories</h4>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={"/userCategories"}>
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
