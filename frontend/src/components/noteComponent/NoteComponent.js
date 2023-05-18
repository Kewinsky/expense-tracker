import { Button, Form } from "react-bootstrap";
import "./noteComponent.scss";
import NoteService from "../../services/noteService";
import { useEffect, useState } from "react";
import AuthService from "../../services/authService";

const NoteComponent = ({ note, getNotes, month }) => {
  const currentUser = AuthService.getCurrentUser();

  const [updatedNote, setUpdatedNote] = useState(note?.note ?? "");

  const handleInputChange = (e) => {
    setUpdatedNote(e.target.value);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    await NoteService.updateNote(note?.id, {
      userId: currentUser.id,
      note: updatedNote,
      month: month,
    });
    getNotes();
  };

  useEffect(() => {
    setUpdatedNote(note?.note ?? "");
  }, [note]);

  return (
    <Form.Group>
      <h4>Notes</h4>
      <Form.Control
        as="textarea"
        defaultValue={updatedNote}
        onChange={handleInputChange}
        value={updatedNote}
      />
      <Button variant="outline-dark" className="mt-3" onClick={handleSaveNote}>
        Save
      </Button>
    </Form.Group>
  );
};

export default NoteComponent;
