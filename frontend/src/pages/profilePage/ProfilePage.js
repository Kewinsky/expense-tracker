import SimplePage from "../simplePage/SimplePage";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Card, Col, Row } from "react-bootstrap";
import AuthService from "../../services/authService";
import { BsPersonCircle } from "react-icons/bs";

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);

  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  return (
    <SimplePage>
      <Card className={`bg-${theme}`}>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body className="m-4">
          <div className="mb-5 text-center">
            <BsPersonCircle size={80} />
          </div>
          <Row>
            <Col className="d-flex align-items-center">
              <div>
                <h5 className="m-0">Credentials</h5>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={`/update/profile/${currentUser.id}`}>
                <Button variant={`outline-${reversedTheme}`}>Edit</Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </SimplePage>
  );
};

export default ProfilePage;
