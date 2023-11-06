import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ModalComponent from "../modalComponent/ModalComponent";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";

const ActionButtonsComponents = ({
  handleUpdate,
  handleDelete,
  record,
  theme,
}) => {
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <td className="text-center">
      <Link className="mx-3" to={`${handleUpdate}/${record.id}`}>
        <Button variant={`outline-${theme}`}>
          <BsPencilSquare size={20} />
        </Button>
      </Link>
      <Button variant="outline-danger" type="submit" onClick={handleShow}>
        <BsTrashFill size={20} />
      </Button>
      <ModalComponent
        handleDelete={handleDelete}
        record={record}
        show={show}
        setShow={setShow}
        theme={reversedTheme}
      />
    </td>
  );
};

export default ActionButtonsComponents;
