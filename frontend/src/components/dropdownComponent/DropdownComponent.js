import Form from "react-bootstrap/Form";

const DropdownComponent = ({ value, onChange, options }) => {
  return (
    <Form.Select required onChange={onChange} value={value}>
      <option value="" defaultValue disabled>
        Select category
      </option>
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Form.Select>
  );
};

export default DropdownComponent;
