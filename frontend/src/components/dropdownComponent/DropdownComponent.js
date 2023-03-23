import Dropdown from "react-bootstrap/Dropdown";
import "../dropdownComponent/dropdownComponent.scss";

const DropdownComponent = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-dark">Choose category</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Food</Dropdown.Item>
        <Dropdown.Item>Utilities</Dropdown.Item>
        <Dropdown.Item>Transport</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;
