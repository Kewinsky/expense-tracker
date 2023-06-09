import { Button, Form } from "react-bootstrap";
import "./noteComponent.scss";
import NoteService from "../../services/noteService";
import { useEffect, useState, useContext } from "react";
import AuthService from "../../services/authService";
import { ThemeContext } from "../../App";
import {
  errorNotification,
  successNotification,
} from "../../helpers/toastNotifications";

const NoteComponent = ({ note, getNotes, month, year }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const currentUser = AuthService.getCurrentUser();

  const [updatedNote, setUpdatedNote] = useState(note?.note ?? "");

  const handleInputChange = (e) => {
    setUpdatedNote(e.target.value);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();

    try {
      const response = await NoteService.updateNote(note?.id, {
        userId: currentUser.id,
        note: updatedNote,
        month: month,
        year: year,
      });
      successNotification(response);
    } catch (err) {
      errorNotification(err.message);
    }
    getNotes();
  };

  useEffect(() => {
    setUpdatedNote(note?.note ?? "");
  }, [note]);

  return (
    <Form.Group>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Notes</h4>
        <Button variant={`outline-${reversedTheme}`} onClick={handleSaveNote}>
          Save
        </Button>
      </div>
      <Form.Control
        as="textarea"
        onChange={handleInputChange}
        value={updatedNote}
        className={`${theme}Theme`}
      />
    </Form.Group>
  );
};

export default NoteComponent;
