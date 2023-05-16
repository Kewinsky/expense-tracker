import { Form } from "react-bootstrap";
import ThemeModeService from "../../services/themeModeService";
import "./noteComponent.scss";

const NoteComponent = () => {
  const inputTheme =
    ThemeModeService.getCurrentThemeMode() === "dark" ? "darkTheme" : "";
  return (
    <Form.Group>
      <h4>Notes</h4>
      <Form.Control as="textarea" className={inputTheme} />
    </Form.Group>
  );
};

export default NoteComponent;
