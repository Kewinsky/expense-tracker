import { Form } from "react-bootstrap";
import "./noteComponent.scss";

const NoteComponent = () => {
  return (
    <Form.Group>
      <h4>Notes</h4>
      <Form.Control as="textarea" />
    </Form.Group>
  );
};

export default NoteComponent;
