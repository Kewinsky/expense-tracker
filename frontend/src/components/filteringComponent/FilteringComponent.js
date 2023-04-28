import { useEffect, useState } from "react";
import DropdownComponent from "../dropdownComponent/DropdownComponent";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import MultiselectComponent from "../multiselectComponent/MultiselectComponent";
import "../multiselectComponent/multiselectComponent.scss";
import { expenseFilter } from "../../helpers/expenseFilter";

const FilteringComponent = ({ expenses, categories, setFilteredExpenses }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = new Date();

  const [category, setCategory] = useState(["ALL"]);
  const [month, setMonth] = useState(months[currentMonth.getMonth()]);

  const handleSelectMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)
    );
  };

  const filterExpenses = () => {
    const filteredExpenses = expenseFilter(
      expenses,
      months.indexOf(month),
      category
    );
    setFilteredExpenses(filteredExpenses);
  };

  const handleFiltering = (e) => {
    e.preventDefault();
    filterExpenses();
  };

  useEffect(() => {
    filterExpenses();
  }, []);

  return (
    <Container className="my-3">
      <Form onSubmit={handleFiltering}>
        <Row className="align-items-end" xs={1} md={2} lg={5}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose month</Form.Label>
              <DropdownComponent
                value={month}
                onChange={handleSelectMonth}
                options={months}
                placeholder={"Select month"}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose category</Form.Label>
              {/* <MultiselectComponent options={categories} /> */}
              <Form.Control
                as="select"
                multiple
                value={category}
                onChange={handleSelectCategory}
                className="setHeight"
              >
                <option key="ALL" value="ALL" defaultValue>
                  ALL
                </option>
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Button variant="outline-dark" type="submit" className="w-100">
                Filter
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringComponent;
