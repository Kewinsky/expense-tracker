import { BsFillBarChartFill } from "react-icons/bs";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { filterByYear } from "../../helpers/filteringMethods";
import { sumAll } from "../../helpers/summingMethods";
import "./summaryComponent.scss";
import TooltipComponent from "../tooltipComponent/TooltipComponent";
import {
  balanceCurrValueMessage,
  balanceMessage,
  balancePrevValueMessage,
  outcomeCurrValueMessage,
  outcomeMessage,
  outcomePrevValueMessage,
  savedCurrValueMessage,
  savedMessage,
  savedPrevValueMessage,
} from "../../utils/tooltipMassages";

const SummaryComponent = ({
  year,
  incomes,
  income,
  outcome,
  previousIncome,
  previousOutcome,
}) => {
  const { expenses, theme } = useContext(ThemeContext);

  // Expenses
  const expensesOfCurrentYear = filterByYear(expenses, year);
  const expensesOfPreviousYear = filterByYear(expenses, year - 1);

  // Sum of all expenses from current/previous year
  const totalOutcomeCurrentYear = sumAll(expensesOfCurrentYear);
  const totalOutcomePreviousYear = sumAll(expensesOfPreviousYear);

  // ---

  // Incomes
  const incomesOfCurrentYear = filterByYear(incomes, year);
  const incomesOfPreviousYear = filterByYear(incomes, year - 1);

  // Sum of all incomes from current/previous year
  const totalIncomeCurrentYear = sumAll(incomesOfCurrentYear);
  const totalIncomePreviousYear = sumAll(incomesOfPreviousYear);

  const outcomeStatus = (current, previous) => {
    return current > previous ? "text-danger" : "text-success";
  };

  const balanceStatus = (current, previous) => {
    return current < 0 || current < previous ? "text-danger" : "text-success";
  };

  // Balance of current/previous month
  const balance = income - outcome;
  const previousBalance = previousIncome - previousOutcome;

  return (
    <Container>
      <Row
        className="d-flex text-center justify-content-center p-4"
        xs={1}
        md={3}
      >
        <Col className="d-flex justify-content-center mb-4 mb-md-0">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">
                <TooltipComponent placement={"top"} message={outcomeMessage}>
                  Outcome
                </TooltipComponent>
              </h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <TooltipComponent
                placement={"top"}
                message={outcomeCurrValueMessage}
              >
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
              </TooltipComponent>
              <TooltipComponent
                placement={"top"}
                message={outcomePrevValueMessage}
              >
                <p className="value-last">{previousOutcome}</p>
              </TooltipComponent>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center mb-4 mb-md-0">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">
                <TooltipComponent placement={"top"} message={balanceMessage}>
                  Balance
                </TooltipComponent>
              </h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <TooltipComponent
                placement={"top"}
                message={balanceCurrValueMessage}
              >
                <p
                  className={
                    "value-main " + balanceStatus(balance, previousBalance)
                  }
                >
                  {balance}
                  {balanceStatus(balance, previousBalance) === "text-danger" ? (
                    <BsFillBarChartFill size={28} className="mx-1 mirrored" />
                  ) : (
                    <BsFillBarChartFill size={28} className="mx-1" />
                  )}
                </p>
              </TooltipComponent>
              <TooltipComponent
                placement={"top"}
                message={balancePrevValueMessage}
              >
                <p className="value-last">{previousBalance}</p>
              </TooltipComponent>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-center">
          <Card className={`bg-${theme} summary-tile`}>
            <Card.Header>
              <h5 className="m-0">
                <TooltipComponent placement={"top"} message={savedMessage}>
                  Saved
                </TooltipComponent>
              </h5>
            </Card.Header>
            <Card.Body className="align-self-center">
              <TooltipComponent
                placement={"top"}
                message={savedCurrValueMessage}
              >
                <p className={"value-main text-success"}>
                  {totalIncomeCurrentYear - totalOutcomeCurrentYear > 0
                    ? totalIncomeCurrentYear - totalOutcomeCurrentYear
                    : 0}
                </p>
              </TooltipComponent>
              <TooltipComponent
                placement={"top"}
                message={savedPrevValueMessage}
              >
                <p className="value-last">
                  {totalIncomePreviousYear - totalOutcomePreviousYear > 0
                    ? totalIncomePreviousYear - totalOutcomePreviousYear
                    : 0}
                </p>
              </TooltipComponent>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SummaryComponent;
