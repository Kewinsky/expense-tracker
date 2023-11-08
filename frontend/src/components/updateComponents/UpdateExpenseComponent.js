import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { dropdownCategory } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import CategoryService from "../../services/categoryService";
import ExpenseService from "../../services/expenseService";
import { reloadData } from "../../helpers/reloadData";
import { selectItemToUpdate } from "../../helpers/selectItemToUpdate";

const UpdateExpenseComponent = () => {
  const { id: expenseId } = useParams();
  const navigate = useNavigate();

  const { theme, expenses, setExpenses } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const selectedExpense = selectItemToUpdate(expenses, expenseId);

  const [categories, setCategories] = useState([]);

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSetDefaults = () => {
    const dropdownCategoryList = dropdownCategory(categories);
    const selectedCategory = dropdownCategoryList.find(
      (cat) => cat.value === selectedExpense.category
    );
    setDate(selectedExpense.date);
    setTitle(selectedExpense.title);
    setValue(selectedExpense.value);
    setCategory(selectedCategory);
  };

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
    setCategory(e);
  };

  const updatedExpense = {
    date,
    title,
    value,
    categoryId: category ? category.id : 0,
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      ExpenseService.updateExpense(expenseId, updatedExpense)
        .then((res) => {
          setMessage(res);
        })
        .then(() => {
          reloadData(ExpenseService.getExpensesByUser, setExpenses);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
  };

  const getCategoriesByUser = async () => {
    const response = await CategoryService.getCategoriesByUser();

    setCategories(response.data);
  };

  useEffect(() => {
    getCategoriesByUser();
  }, []);

  useEffect(() => {
    if (selectedExpense) {
      handleSetDefaults();
    }

    if (expenses.length && !selectedExpense) {
      navigate("/error");
    }
  }, [selectedExpense, expenses, categories]);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update Expense</Card.Header>
      <Form onSubmit={handleUpdateExpense} className="m-5">
        <Form.Group className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
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
            required
            onChange={handleInputTitle}
            value={title}
            type="text"
            placeholder="Sushi"
            className={`${theme}Theme`}
            disabled={message}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Value</Form.Label>
          <Form.Control
            required
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
            options={dropdownCategory(categories)}
            handleSelect={handleSelectCategory}
            theme={`${theme}Theme`}
            value={category}
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
                href="/expenses"
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
              <Link to={"/expenses"} className={`link-${reversedTheme} `}>
                Back
              </Link>
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
