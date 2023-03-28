import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ModalComponent({ expense, setExpenses, show, setShow }) {
  const handleClose = () => setShow(false);

  const reloadData = async () => {
    const response = await axios.get(
      "http://localhost:8080/v1/api/expenses/allExpenses"
    );
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    await axios
      .delete(`http://localhost:8080/v1/api/expenses/deleteExpense/${id}`)
      .then(() => reloadData())
      .then(() => {
        console.log("expense deleted");
      });
  };

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
        <Button variant="danger" onClick={() => deleteExpense(expense.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
