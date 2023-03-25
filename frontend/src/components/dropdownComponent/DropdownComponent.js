import Form from "react-bootstrap/Form";

const DropdownComponent = () => {
  return (
    <Form.Select required>
      <option value="" selected disabled>
        Select category
      </option>
      <option value="food">Food</option>
      <option value="transport">Transport</option>
      <option value="utilities">Utilities</option>
    </Form.Select>
  );
};

export default DropdownComponent;
