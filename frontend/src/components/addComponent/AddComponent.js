import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
const AddComponent = () => {
  return (
    <Container className="my-3">
      <Row className="align-items-end">
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Multisport subscription" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Value</Form.Label>
            <Form.Control type="number" step={0.5} placeholder="100,00" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <DropdownComponent />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Add
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default AddComponent;
