import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ExpenseService from "../../services/expenseService";
import Select from "react-select";
import { dropdownData } from "../../helpers/dropdownData";
const UpdateExpenseComponent = ({
  expenses,
  setExpenses,
  expenseCategories,
}) => {
  const { id } = useParams();
  const expenseId = id;

  const selectedExpense = expenses.find((item) => {
    return item.id === parseInt(expenseId);
  });

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
    setCategory(e.value);
  };

  const updatedExpense = {
    date,
    title,
    value,
    category: category.toUpperCase(),
  };

  const reloadData = async () => {
    const response = await ExpenseService.getExpensesByUser();

    setExpenses(response.data);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    await ExpenseService.updateExpense(expenseId, updatedExpense)
      .then(() => reloadData())
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
        <Select
          options={dropdownData(expenseCategories)}
          defaultValue={
            dropdownData(expenseCategories)[expenseCategories.indexOf(category)]
          }
          onChange={handleSelectCategory}
        />
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

export default UpdateExpenseComponent;
