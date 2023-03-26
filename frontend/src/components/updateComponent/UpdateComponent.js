import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
const UpdateComponent = ({ expenses, setExpenses }) => {
  const { id } = useParams();
  const expenseId = id;

  const selectedExpense = expenses.find((item) => {
    return item.id === parseInt(expenseId);
  });

  console.log({ selectedExpense });

  const [date, setDate] = useState(selectedExpense.date);
  const [title, setTitle] = useState(selectedExpense.title);
  const [value, setValue] = useState(selectedExpense.value);
  const [category, setCategory] = useState(selectedExpense.category);

  const handleInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

  const updatedExpense = {
    date,
    title,
    value,
    category: category.toUpperCase(),
  };

  const reloadData = async () => {
    const response = await axios.get(
      "http://localhost:8080/v1/api/expenses/allExpenses"
    );
    setExpenses(response.data);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:8080/v1/api/expenses/updateExpense/${expenseId}`,
        updatedExpense
      )
      .then(() => reloadData())
      .then(() => {
        console.log("expense updated");
      })
      .then((window.location = "/tracker"));
  };

  return (
    <Form onSubmit={handleUpdateExpense}>
      <Form.Group className="mt-3">
        <Form.Label>Date</Form.Label>
        <Form.Control onChange={handleInputDate} value={date} type="date" />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={handleInputTitle}
          value={title}
          type="text"
          placeholder="Multisport subscription"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Value</Form.Label>
        <Form.Control
          onChange={handleInputValue}
          value={value}
          type="number"
          step={0.5}
          placeholder="100,00"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Category</Form.Label>
        <DropdownComponent value={category} onChange={handleSelectCategory} />
      </Form.Group>

      <Form.Group className="mt-3">
        <Button variant="success" type="submit" className="w-100">
          Submit
        </Button>
      </Form.Group>
      <Form.Group className="mt-2">
        <Button
          variant="outline-dark"
          type="submit"
          className="w-100"
          href="/tracker"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateComponent;
