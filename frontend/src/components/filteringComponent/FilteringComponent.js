import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";

const FilteringComponent = ({
  categories,
  month,
  setMonth,
  category,
  setCategory,
  months,
  filterExpenses,
}) => {
  const { theme } = useContext(ThemeContext);
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const getDefaultValue = () => {
    return dropdownData(months)[months.indexOf(month)];
  };

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
              <SelectComponent
                options={months}
                handleSelect={handleSelectMonth}
                theme={inputTheme}
                defaultValue={getDefaultValue()}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Choose category</Form.Label>
              <SelectComponent
                isMulti={true}
                closeMenuOnSelect={false}
                options={categories}
                handleSelect={handleSelectCategory}
                theme={inputTheme}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringComponent;
