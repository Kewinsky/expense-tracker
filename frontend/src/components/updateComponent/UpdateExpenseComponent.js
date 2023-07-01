import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import ExpenseService from "../../services/expenseService";
import { dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import { reloadData } from "../../helpers/reloadData";

const UpdateExpenseComponent = ({
  expenses,
  setExpenses,
  expenseCategories,
}) => {
  const { id } = useParams();
  const expenseId = id;
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const selectedExpense = expenses.find((item) => {
    return item.id === parseInt(expenseId);
  });

  const getDefaultValue = () => {
    return dropdownData(expenseCategories)[expenseCategories.indexOf(category)];
  };

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

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    await ExpenseService.updateExpense(expenseId, updatedExpense)
      .then(() => reloadData(ExpenseService.getExpensesByUser, setExpenses))
      .then(navigate("/tracker"));
  };

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update Expense</Card.Header>
      <Form onSubmit={handleUpdateExpense} className="mt-1 mb-5 mx-5">
        <Form.Group className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            onChange={handleInputDate}
            value={date}
            type="date"
            className={inputTheme}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleInputTitle}
            value={title}
            type="text"
            placeholder="Multisport subscription"
            className={inputTheme}
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
            className={inputTheme}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Category</Form.Label>
          <SelectComponent
            options={dropdownData(expenseCategories)}
            handleSelect={handleSelectCategory}
            theme={inputTheme}
            defaultValue={getDefaultValue()}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Button variant="success" type="submit" className="w-100">
            Submit
          </Button>
        </Form.Group>
        <Form.Group className="mt-2">
          <Button
            variant={`outline-${reversedTheme}`}
            type="submit"
            className="w-100"
            href="/tracker"
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default UpdateExpenseComponent;
