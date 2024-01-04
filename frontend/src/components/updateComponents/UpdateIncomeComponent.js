import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import IncomeService from "../../services/incomeService";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import { selectItemToUpdate } from "../../helpers/selectItemToUpdate";

const UpdateIncomeComponent = ({ incomes }) => {
  const { id: incomeId } = useParams();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const selectedIncome = selectItemToUpdate(incomes, incomeId);

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSetDefaults = () => {
    setDate(selectedIncome.date);
    setTitle(selectedIncome.title);
    setValue(selectedIncome.value);
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

  const updatedIncome = {
    date,
    title,
    value,
  };

  const handleUpdateIncome = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      IncomeService.updateIncome(incomeId, updatedIncome)
        .then((res) => {
          setMessage(res);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
  };

  useEffect(() => {
    if (selectedIncome) {
      handleSetDefaults();
    }

    if (incomes.length && !selectedIncome) {
      navigate("/error");
    }
  }, [selectedIncome, incomes]);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update Income</Card.Header>
      <Form onSubmit={handleUpdateIncome} className="m-5">
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
            step={1}
            placeholder="100,00"
            className={`${theme}Theme`}
            disabled={message}
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
                href="/incomes"
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
              <Link to={"/incomes"} className={`link-${reversedTheme} `}>
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

export default UpdateIncomeComponent;
