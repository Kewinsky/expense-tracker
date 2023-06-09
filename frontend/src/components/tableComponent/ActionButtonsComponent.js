import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ModalComponent from "../modalComponent/ModalComponent";

const ActionButtonsComponents = ({
  handleUpdate,
  handleDelete,
  record,
  theme,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <td className="text-center">
      <Link
        className={`link-${theme} mx-3`}
        to={`${handleUpdate}/${record.id}`}
      >
        <Button variant={`outline-${theme}`}>Edit</Button>
      </Link>
      <Button variant={`outline-${theme}`} type="submit" onClick={handleShow}>
        Delete
      </Button>
      <ModalComponent
        handleDelete={handleDelete}
        record={record}
        show={show}
        setShow={setShow}
        theme={theme}
      />
    </td>
  );
};

export default ActionButtonsComponents;
