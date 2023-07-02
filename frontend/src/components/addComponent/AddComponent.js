import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseService from "../../services/expenseService";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { dropdownData } from "../../helpers/dropdownData";
import { reloadData } from "../../helpers/reloadData";
import {
  errorNotification,
  successNotification,
} from "../../helpers/toastNotifications";

const AddComponent = ({ setExpenses, currentUser, categories }) => {
  const { theme } = useContext(ThemeContext);
  // TODO: theme refactor
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  let userId = 0;
  if (currentUser !== undefined) {
    userId = currentUser.id;
  }

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

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

  const newExpense = {
    date,
    title,
    value,
    category: category.toUpperCase(),
    userId: userId,
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    setDate("");
    setTitle("");
    setValue("");
    // TODO: handle clearing select
    setCategory("");

    try {
      const response = await ExpenseService.addExpense(newExpense);
      reloadData(ExpenseService.getExpensesByUser, setExpenses);
      successNotification(response);
    } catch (err) {
      errorNotification(err.message);
    }
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
                className={inputTheme}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Multisport subscription"
                value={title}
                onChange={handleInputTitle}
                className={inputTheme}
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
                placeholder="100,00"
                value={value}
                onChange={handleInputValue}
                className={inputTheme}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <SelectComponent
                options={dropdownData(categories)}
                handleSelect={handleSelectCategory}
                placeholder={"Select category"}
                theme={inputTheme}
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

export default AddComponent;
