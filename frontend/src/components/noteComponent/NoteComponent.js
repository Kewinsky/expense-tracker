import { Button, Form } from "react-bootstrap";
import "./noteComponent.scss";
import NoteService from "../../services/noteService";
import { useEffect, useState, useContext } from "react";
import AuthService from "../../services/authService";
import { ThemeContext } from "../../App";
import { toast } from "react-toastify";

const NoteComponent = ({ note, getNotes, month }) => {
  const { theme } = useContext(ThemeContext);
  const inputTheme = theme === "dark" ? "darkTheme" : "";
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const currentUser = AuthService.getCurrentUser();

  const [updatedNote, setUpdatedNote] = useState(note?.note ?? "");

  const handleInputChange = (e) => {
    setUpdatedNote(e.target.value);
  };

  const showToastMessageOnSave = () => {
    toast.success("Note saved!", {
      theme: theme,
    });
  };

  const showToastErrorMessage = () => {
    toast.error("Something went wrong!", {
      theme: theme,
    });
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    await NoteService.updateNote(note?.id, {
      userId: currentUser.id,
      note: updatedNote,
      month: month,
    })
      .catch((err) => {
        showToastErrorMessage();
        console.log(err.response.data);
      })
      .then(() => showToastMessageOnSave());
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
        className={inputTheme}
      />
    </Form.Group>
  );
};

export default NoteComponent;
