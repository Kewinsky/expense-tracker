import { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import DarkModeComponent from "../darkModeComponent/DarkModeComponent";
import { ThemeContext } from "../../App";

const SettingsComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div className="d-flex justify-content-center m-3">
        <Card className={`bg-${theme} card-width`}>
          <Card.Header>Settings</Card.Header>
          <Card.Body className="m-4">
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
      </div>
    </div>
  );
};

export default SettingsComponent;
