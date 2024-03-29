import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { dropdownCategory, dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { getYearArray } from "../../utils/yearData";

const FilteringExpensesComponent = ({
  categories,
  title,
  setTitle,
  month,
  setMonth,
  year,
  setYear,
  filteringCategories,
  setFilteringCategories,
  months,
  filterExpenses,
}) => {
  const years = getYearArray();
  const monthFilters = ["All", ...months];

  const { theme } = useContext(ThemeContext);

  const getDefaultMonth = () => {
    return dropdownData(months)[months.indexOf(month)];
  };

  const getDefaultYear = () => {
    return dropdownData(years)[years.indexOf(year)];
  };

  const handleSelectMonth = (e) => {
    setMonth(e.value);
  };

  const handleSelectYear = (e) => {
    setYear(e.value);
  };

  const handleSelectCategory = (e) => {
    setFilteringCategories(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleInputTitle = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    filterExpenses();
  }, [year, month, filteringCategories]);

  return (
    <Container className="my-3">
      <Form>
        <Row className="align-items-end" xs={1} md={2} lg={5}>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Filter by Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Petrol"
                onChange={handleInputTitle}
                className={`${theme}Theme`}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Filter by Year</Form.Label>
              <SelectComponent
                options={dropdownData(years)}
                handleSelect={handleSelectYear}
                theme={`${theme}Theme`}
                value={getDefaultYear()}
                placeholder={"Select year"}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Filter by Month</Form.Label>
              <SelectComponent
                options={dropdownData(monthFilters)}
                handleSelect={handleSelectMonth}
                theme={`${theme}Theme`}
                value={getDefaultMonth()}
                placeholder={"Select month"}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Filter by Category</Form.Label>
              <SelectComponent
                isMulti={true}
                closeMenuOnSelect={false}
                options={dropdownCategory(categories)}
                handleSelect={handleSelectCategory}
                theme={`${theme}Theme`}
                placeholder={"Select"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringExpensesComponent;
