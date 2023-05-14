import { Form } from "react-bootstrap";
import "./noteComponent.scss";

const NoteComponent = ({ notes, setNotes, month }) => {
  return (
    <Form.Group>
      <h4>Notes</h4>
      <Form.Control
        as="textarea"
        // defaultValue={note}
        // onChange={handleInputChange}
      />
    </Form.Group>
  );
};

export default NoteComponent;
