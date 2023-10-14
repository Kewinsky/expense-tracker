import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import ExpenseService from "../../services/expenseService";
import { dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import UserService from "../../services/userService";
import { deserializeCategories } from "../../helpers/categoriesMapper";

const UpdateExpenseComponent = () => {
  const { id: expenseId } = useParams();

  const { theme, expenses } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const selectedExpense = expenses.find((item) => {
    return item.id === parseInt(expenseId);
  });

  const [date, setDate] = useState(selectedExpense.date);
  const [title, setTitle] = useState(selectedExpense.title);
  const [value, setValue] = useState(selectedExpense.value);
  const [category, setCategory] = useState(selectedExpense.category);
  const [categories, setCategories] = useState([]);
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
    category,
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      ExpenseService.updateExpense(expenseId, updatedExpense)
        .then(() => {
          setMessage("Expense updated successfully");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
  };

  const getUserCategories = async () => {
    const response = await UserService.getUserCategories();

    const mappedCategories = deserializeCategories(response.data);

    setCategories(mappedCategories);
  };

  const getDefaultValue = () => {
    if (categories.length) {
      return dropdownData(categories)[categories.indexOf(category)];
    }
  };

  useEffect(() => {
    getUserCategories();
  }, []);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update Expense</Card.Header>
      <Form onSubmit={handleUpdateExpense} className="m-5">
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
            options={dropdownData(categories)}
            handleSelect={handleSelectCategory}
            theme={`${theme}Theme`}
            defaultValue={getDefaultValue()}
          />
        </Form.Group>

        <Form.Group className="mt-5">
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
