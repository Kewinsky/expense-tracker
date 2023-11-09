import SimplePage from "../simplePage/SimplePage";
import { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import DarkModeComponent from "../../components/darkModeComponent/DarkModeComponent";
import { ThemeContext } from "../../App";
import { BsPersonCircle } from "react-icons/bs";
import AuthService from "../../services/authService";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const { theme } = useContext(ThemeContext);

  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  return (
    <SimplePage>
      <Card className={`bg-${theme} card-width`}>
        <Card.Header>Settings</Card.Header>
        <Card.Body className="m-4">
          <div className="mb-5 text-center">
            <BsPersonCircle size={80} />
          </div>
          <Row className="mb-4">
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
          <Row>
            <Col className="d-flex align-items-center">
              <div>
                <h5 className="m-0">Dark Mode</h5>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <DarkModeComponent />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </SimplePage>
  );
};

export default SettingsPage;
