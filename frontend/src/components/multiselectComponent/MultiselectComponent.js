import { useState } from "react";
import { Form } from "react-router-dom";
import "../multiselectComponent/multiselectComponent.scss";

const MultiselectComponent = ({ options }) => {
  const [field, setField] = useState([]);

  return (
    <Form.Control
      as="select"
      multiple
      value={field}
      onChange={(e) =>
        setField(
          [].slice.call(e.target.selectedOptions).map((item) => item.value)
        )
      }
      className="setHeight"
    >
      <option key="ALL" value="ALL">
        ALL
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  );
};

export default MultiselectComponent;
