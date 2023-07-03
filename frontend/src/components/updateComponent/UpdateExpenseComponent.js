import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import ExpenseService from "../../services/expenseService";
import { dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import { reloadData } from "../../helpers/reloadData";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";

const UpdateExpenseComponent = ({
  expenses,
  setExpenses,
  expenseCategories,
}) => {
  const { id } = useParams();
  const expenseId = id;

  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

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

    setMessage("");
    setError("");

    try {
      const response = await ExpenseService.updateExpense(
        expenseId,
        updatedExpense
      );
      setIsPending(true);

      setTimeout(() => {
        setIsPending(false);
        setMessage(response);
      }, 1000);
      reloadData(ExpenseService.getExpensesByUser, setExpenses);
    } catch (err) {
      setError(err.message);
    }
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
            className={`${theme}Theme`}
            disabled={message}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleInputTitle}
            value={title}
            type="text"
            placeholder="Multisport subscription"
            className={`${theme}Theme`}
            disabled={message}
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
            className={`${theme}Theme`}
            disabled={message}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Category</Form.Label>
          <SelectComponent
            options={dropdownData(expenseCategories)}
            handleSelect={handleSelectCategory}
            theme={`${theme}Theme`}
            defaultValue={getDefaultValue()}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          {isPending && <SpinnerComponent />}
          {!isPending && !message && (
            <>
              <Button variant="success" type="submit" className="w-100">
                Submit
              </Button>
              <Button
                variant={`outline-${reversedTheme}`}
                type="submit"
                className="w-100 mt-2"
                href="/tracker"
              >
                Cancel
              </Button>
            </>
          )}
        </Form.Group>
        {message && (
          <Form.Group className="mt-5">
            <div className="alert alert-success m-0" role="alert">
              {message}
            </div>
            <div className="mt-5 text-center">
              <a href="/tracker" className={`link-${reversedTheme} `}>
                Back
              </a>
            </div>
          </Form.Group>
        )}
        {error && (
          <Form.Group className="mt-5">
            <div className="alert alert-danger m-0" role="alert">
              {error}
            </div>
          </Form.Group>
        )}
      </Form>
    </Card>
  );
};

export default UpdateExpenseComponent;
