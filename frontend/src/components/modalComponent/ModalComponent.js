import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ExpenseService from "../../services/expenseService";

function ModalComponent({ expense, setExpenses, show, setShow }) {
  const handleClose = () => setShow(false);

  const reloadData = async () => {
    const response = await ExpenseService.getExpensesByUser();
    setExpenses(response.data);
  };

  const handleDelete = async (id) => {
    await ExpenseService.deleteExpense(id)
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
        <Button variant="danger" onClick={() => handleDelete(expense.id)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
