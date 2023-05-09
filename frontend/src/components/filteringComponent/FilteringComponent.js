import DropdownComponent from "../dropdownComponent/DropdownComponent";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import MultiselectComponent from "../multiselectComponent/MultiselectComponent";
import ThemeModeService from "../../services/themeModeService";
import "../multiselectComponent/multiselectComponent.scss";

const FilteringComponent = ({
  categories,
  month,
  setMonth,
  category,
  setCategory,
  months,
  filterExpenses,
  theme,
}) => {
  const buttonTheme = theme === "dark" ? "light" : "dark";
  const inputTheme =
    ThemeModeService.getCurrentThemeMode() === "dark" ? "darkTheme" : "";

  const handleSelectMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleSelectCategory = (e) => {
    setCategory(
      [].slice.call(e.target.selectedOptions).map((item) => item.value)
    );
  };

  const handleFiltering = (e) => {
    e.preventDefault();
    filterExpenses();
  };

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
                theme={inputTheme}
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
                className={`setHeight ${inputTheme}`}
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
              <Button
                variant={`outline-${buttonTheme}`}
                type="submit"
                className="w-100"
              >
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
