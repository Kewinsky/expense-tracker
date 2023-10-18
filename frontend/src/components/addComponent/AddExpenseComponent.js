import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseService from "../../services/expenseService";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { dropdownCategory } from "../../helpers/dropdownData";
import { reloadData } from "../../helpers/reloadData";
import {
  errorNotification,
  successNotification,
} from "../../helpers/toastNotifications";
import AuthService from "../../services/authService";

const AddExpenseComponent = ({ setExpenses, categories }) => {
  const { theme } = useContext(ThemeContext);
  const currentUser = AuthService.getCurrentUser();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(null);

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

  const newExpense = {
    date,
    title,
    value,
    categoryId: category ? category.id : 0,
    userId: currentUser.id,
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    setDate("");
    setTitle("");
    setValue("");
    setCategory(null);

    ExpenseService.addExpense(newExpense)
      .then((res) => {
        successNotification(res);
      })
      .then(() => {
        reloadData(ExpenseService.getExpensesByUser, setExpenses);
      })
      .catch((err) => {
        errorNotification(err.message);
      });
  };

  return (
    <Container className="my-3">
      <Form onSubmit={handleAddExpense}>
        <Row className="align-items-end" xs={1} md={2} lg={5}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                value={date}
                onChange={handleInputDate}
                className={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Sushi"
                value={title}
                onChange={handleInputTitle}
                className={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control
                required
                type="number"
                step={0.5}
                min="1"
                placeholder="100"
                value={value}
                onChange={handleInputValue}
                className={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <SelectComponent
                options={dropdownCategory(categories)}
                value={category}
                handleSelect={handleSelectCategory}
                placeholder={"Select"}
                theme={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Add
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddExpenseComponent;
