import Form from "react-bootstrap/Form";

const DropdownComponent = ({ value, onChange }) => {
  return (
    <Form.Select required onChange={onChange} value={value}>
      <option value="" selected disabled>
        Select category
      </option>
      <option value="FOOD">Food</option>
      <option value="TRANSPORT">Transport</option>
      <option value="UTILITIES">Utilities</option>
    </Form.Select>
  );
};

export default DropdownComponent;
