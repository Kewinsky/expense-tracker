import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ModalComponent from "../modalComponent/ModalComponent";
const ActionButtonsComponents = ({ expense, setExpenses }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <td className="text-center">
      <Link className="link-dark mx-3" to={`/update/${expense.id}`}>
        <Button variant="outline-dark">Edit</Button>
      </Link>
      <Button variant="outline-dark" type="submit" onClick={handleShow}>
        Delete
      </Button>
      <ModalComponent
        expense={expense}
        setExpenses={setExpenses}
        show={show}
        setShow={setShow}
      />
    </td>
  );
};

export default ActionButtonsComponents;
