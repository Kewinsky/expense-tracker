import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalComponent from "../modalComponent/ModalComponent";
const ActionButtonsComponents = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <td className="text-center">
      <Button
        href="/update"
        variant="outline-dark"
        type="submit"
        className="mx-2"
      >
        Edit
      </Button>
      <Button variant="outline-dark" type="submit" onClick={handleShow}>
        Delete
      </Button>
      <ModalComponent show={show} setShow={setShow} />
    </td>
  );
};

export default ActionButtonsComponents;
