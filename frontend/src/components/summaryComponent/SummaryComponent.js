import { BsFillBarChartFill } from "react-icons/bs";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../App";
import { filterByYearAndMonth } from "../../helpers/filteringMethods";
import { sumAll } from "../../helpers/summingMethods";
import IncomeService from "../../services/incomeService";
import "./summaryComponent.scss";

const SummaryComponent = ({
  year,
  income,
  outcome,
  previousIncome,
  previousOutcome,
}) => {
  const { expenses, theme } = useContext(ThemeContext);
  const expensesOfCurrentYear = filterByYearAndMonth(expenses, year, null);
  const expensesOfPreviousYear = filterByYearAndMonth(expenses, year - 1, null);

  const [incomesOfCurrentYear, setIncomesOfCurrentYear] = useState(0);
  const [incomesOfPreviousYear, setIncomesOfPreviousYear] = useState(0);

  // Current Year
  const totalOutcomeCurrrentYear = sumAll(expensesOfCurrentYear);
  const totalIncomeCurrrentYear = sumAll(incomesOfCurrentYear);

  // Previous Year
  const totalOutcomePreviousYear = sumAll(expensesOfPreviousYear);
  const totalIncomePreviousYear = sumAll(incomesOfPreviousYear);

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    setIncomesOfCurrentYear(filterByYearAndMonth(response.data, year, null));
    setIncomesOfPreviousYear(
      filterByYearAndMonth(response.data, year - 1, null)
    );
  };

  useEffect(() => {
    getIncomes();
  }, [year]);

  const outcomeStatus = (current, previous) => {
    return current > previous ? "text-danger" : "text-success";
  };

  const balanceStatus = (current, previous) => {
    return current < 0 || current < previous ? "text-danger" : "text-success";
  };

  const balance = income - outcome;
  const previousBalance = previousIncome - previousOutcome;

  return (
    <Container>
      <Row className="d-flex text-center justify-content-center p-4">
        <Col className="d-flex justify-content-center col-12 col-md-4 mb-4 mb-md-0">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">Outcome</h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <p
                className={
                  "value-main " + outcomeStatus(outcome, previousOutcome)
                }
              >
                {outcome}
                {outcomeStatus(outcome, previousOutcome) === "text-danger" ? (
                  <BsFillBarChartFill size={28} className="mx-1" />
                ) : (
                  <BsFillBarChartFill size={28} className="mx-1 mirrored" />
                )}
              </p>
              <p className="value-last">{previousOutcome}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center col-12 col-md-4 mb-4 mb-md-0">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">Balance</h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <p
                className={
                  "value-main " + balanceStatus(balance, previousBalance)
                }
              >
                {balance}
                {balanceStatus(balance, previousBalance) === "text-danger" ? (
                  <BsFillBarChartFill size={28} className="mx-1" />
                ) : (
                  <BsFillBarChartFill size={28} className="mx-1 mirrored" />
                )}
              </p>
              <p className="value-last">{previousBalance}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center col-12 col-md-4">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">Saved</h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <p className={"value-main text-success"}>
                {totalIncomeCurrrentYear - totalOutcomeCurrrentYear > 0
                  ? totalIncomeCurrrentYear - totalOutcomeCurrrentYear
                  : 0}
              </p>
              <p className="value-last">
                {totalIncomePreviousYear - totalOutcomePreviousYear > 0
                  ? totalIncomePreviousYear - totalOutcomePreviousYear
                  : 0}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SummaryComponent;
