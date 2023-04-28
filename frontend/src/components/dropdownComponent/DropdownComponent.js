import Form from "react-bootstrap/Form";

const DropdownComponent = ({ value, onChange, options, placeholder }) => {
  return (
    <Form.Select required onChange={onChange} value={value}>
      <option value="" defaultValue disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
};

export default DropdownComponent;
