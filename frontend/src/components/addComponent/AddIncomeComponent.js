import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ThemeContext } from "../../App";
import AuthService from "../../services/authService";
import IncomeService from "../../services/incomeService";
import {
  errorNotification,
  successNotification,
} from "../../helpers/toastNotifications";
import { reloadData } from "../../helpers/reloadData";

const AddIncomeComponent = ({ setIncomes }) => {
  const { theme } = useContext(ThemeContext);
  const currentUser = AuthService.getCurrentUser();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const handleInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const newIncome = {
    date,
    title,
    value,
    user: {
      id: currentUser.id,
    },
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();

    setDate("");
    setTitle("");
    setValue("");

    IncomeService.addIncome(newIncome)
      .then((res) => {
        successNotification(res);
      })
      .then(() => {
        reloadData(IncomeService.getIncomes, setIncomes);
      })
      .catch((err) => {
        errorNotification(err.message);
      });
  };

  return (
    <Container className="my-3">
      <Form onSubmit={handleAddIncome}>
        <Row className="align-items-end" xs={1} md={2} lg={4}>
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
                placeholder="Salary"
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
                min="0,5"
                placeholder="3000"
                value={value}
                onChange={handleInputValue}
                className={`${theme}Theme`}
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

export default AddIncomeComponent;
