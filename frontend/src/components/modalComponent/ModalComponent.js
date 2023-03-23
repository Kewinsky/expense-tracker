import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
