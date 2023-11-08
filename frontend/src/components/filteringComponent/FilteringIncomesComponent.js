import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { dropdownData } from "../../helpers/dropdownData";
import SelectComponent from "../selectComponent/SelectComponent";
import { ThemeContext } from "../../App";
import { getYearArray } from "../../utils/yearData";

const FilteringIncomesComponent = ({
  month,
  setMonth,
  year,
  setYear,
  months,
  filterIncomes,
}) => {
  const years = getYearArray();

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

  useEffect(() => {
    filterIncomes();
  }, [year, month]);

  return (
    <Container className="my-3">
      <Form>
        <Row className="align-items-end" xs={1} md={2} lg={4}>
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
                options={dropdownData(months)}
                handleSelect={handleSelectMonth}
                theme={`${theme}Theme`}
                value={getDefaultMonth()}
                placeholder={"Select month"}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilteringIncomesComponent;
