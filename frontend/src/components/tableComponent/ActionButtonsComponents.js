import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalComponent from "../modalComponent/ModalComponent";
const ActionButtonsComponents = ({ expense, setExpenses }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const passData = () => setExpenses();

  return (
    <td className="text-center">
      <Button
        href="/update"
        variant="outline-dark"
        type="submit"
        className="mx-2"
        onClick={() => passData()}
      >
        Edit
      </Button>
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
