import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import axios from "axios";
const UpdateComponent = ({ expense, setExpenses }) => {
  const updateExpense = async (id) => {
    const response = await axios.put(
      `http://localhost:8080/v1/api/updateExpense/`
    );
    setExpenses(response.data);
  };

  console.log(expense);

  return (
    <Form>
      <Form.Group className="mt-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Multisport subscription" />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Value</Form.Label>
        <Form.Control type="number" step={0.5} placeholder="100,00" />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Category</Form.Label>
        <DropdownComponent />
      </Form.Group>

      <Form.Group className="mt-3">
        <Button variant="success" type="submit" className="w-100">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateComponent;
