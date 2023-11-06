import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./modalComponent.scss";

const ModalComponent = ({ handleDelete, record, show, setShow, theme }) => {
  const handleClose = () => setShow(false);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={`${theme}Theme custom-modal-header`}>
        <Modal.Title>Delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Footer className={`${theme}Theme`}>
        <Button variant={`outline-${reversedTheme}`} onClick={handleClose}>
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
