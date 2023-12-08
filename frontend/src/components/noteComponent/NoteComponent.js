import { Button, Form, Card } from "react-bootstrap";
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

  const noteRequestBody = {
    note: updatedNote,
    month: month,
    year: year,
    user: {
      id: currentUser.id,
    },
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();

    try {
      const response = await NoteService.updateNote(note?.id, noteRequestBody);
      console.log();
      successNotification(response);
    } catch (err) {
      console.log(err);
      errorNotification(err.message);
    }
    getNotes();
  };

  useEffect(() => {
    setUpdatedNote(note?.note ?? "");
  }, [note]);

  return (
    <Card className={`bg-${theme} dashboard-card`}>
      <Form.Group>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="align-self-center m-0">Notes</h4>
            <Button
              variant={`outline-${reversedTheme}`}
              onClick={handleSaveNote}
            >
              Save
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="vertical-center">
          <Form.Control
            as="textarea"
            onChange={handleInputChange}
            value={updatedNote}
            className={`${theme}Theme`}
          />
        </Card.Body>
      </Form.Group>
    </Card>
  );
};

export default NoteComponent;
