import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({ handleDelete, record, show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete this item?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        If you want to delete this item click 'Yes' button.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
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
