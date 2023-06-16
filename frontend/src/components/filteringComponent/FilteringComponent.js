import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { dropdownData, dropdownDataNumber } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";

const FilteringComponent = ({
  categories,
  month,
  setMonth,
  year,
  setYear,
  category,
  setCategory,
  months,
  years,
  filterExpenses,
}) => {
  const { theme } = useContext(ThemeContext);
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const getDefaultMonth = () => {
    return dropdownData(months)[months.indexOf(month)];
  };

  const getDefaultYear = () => {
    return dropdownDataNumber(years)[years.indexOf(year)];
  };

  const handleSelectMonth = (e) => {
    setMonth(e.value);
  };

  const handleSelectYear = (e) => {
    setYear(e.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    filterExpenses();
  }, [year, month, category]);

  return (
    <Container className="my-3">
      <Form>
        <Row className="align-items-end" xs={1} md={2} lg={5}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose year</Form.Label>
              <SelectComponent
                options={dropdownDataNumber(years)}
                handleSelect={handleSelectYear}
                theme={inputTheme}
                defaultValue={getDefaultYear()}
                placeholder={"Select year"}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose month</Form.Label>
              <SelectComponent
                options={dropdownData(months)}
                handleSelect={handleSelectMonth}
                theme={inputTheme}
                defaultValue={getDefaultMonth()}
                placeholder={"Select month"}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose category</Form.Label>
              <SelectComponent
                isMulti={true}
                closeMenuOnSelect={false}
                options={dropdownData(categories)}
                handleSelect={handleSelectCategory}
                theme={inputTheme}
                placeholder={"Select category"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringComponent;
