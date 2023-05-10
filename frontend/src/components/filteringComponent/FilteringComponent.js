import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Select from "react-select";
import { dropdownData } from "../../helpers/dropdownData";

const FilteringComponent = ({
  categories,
  month,
  setMonth,
  category,
  setCategory,
  months,
  filterExpenses,
}) => {
  const handleSelectMonth = (e) => {
    setMonth(e.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    filterExpenses();
  }, [month, category]);

  return (
    <Container className="my-3">
      <Form>
        <Row className="align-items-end" xs={1} md={2} lg={5}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose month</Form.Label>
              <Select
                options={dropdownData(months)}
                onChange={handleSelectMonth}
                defaultValue={dropdownData(months)[months.indexOf(month)]}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose category</Form.Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={dropdownData(categories)}
                onChange={handleSelectCategory}
                placeholder={"Select categories"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringComponent;
