import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ThemeModeService from "../../services/themeModeService";

const ModalComponent = ({ handleDelete, record, show, setShow, theme }) => {
  const handleClose = () => setShow(false);

  const buttonTheme = theme === "dark" ? "dark" : "light";

  const modalTheme =
    ThemeModeService.getCurrentThemeMode() === "dark" ? "darkTheme" : "";

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className={modalTheme}>
        <Modal.Title>Delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body className={modalTheme}>
        If you want to delete this item click 'Yes' button.
      </Modal.Body>
      <Modal.Footer className={modalTheme}>
        <Button variant={`outline-${buttonTheme}`} onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleDelete(record.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
