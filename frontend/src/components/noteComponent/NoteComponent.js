import { Button, Form } from "react-bootstrap";
import "./noteComponent.scss";
import NoteService from "../../services/noteService";
import { useEffect, useState, useContext } from "react";
import AuthService from "../../services/authService";
import { ThemeContext } from "../../App";

const NoteComponent = ({ note, getNotes, month }) => {
  const { theme } = useContext(ThemeContext);
  const inputTheme = theme === "dark" ? "darkTheme" : "";
  const reversedTheme = theme === "dark" ? "light" : "dark";

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
        onChange={handleInputChange}
        value={updatedNote}
        className={inputTheme}
      />
      <Button
        variant={`outline-${reversedTheme}`}
        className="mt-3"
        onClick={handleSaveNote}
      >
        Save
      </Button>
    </Form.Group>
  );
};

export default NoteComponent;
