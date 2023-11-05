import { BsFillBarChartFill } from "react-icons/bs";
import { Card } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../App";
import { filterByYearAndMonth } from "../../helpers/filteringMethods";
import { sumAllByYear } from "../../helpers/summingMethods";
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

  const [totalIncomeByYear, setTotalIncomeByYear] = useState(0);

  const expensesOfYear = filterByYearAndMonth(expenses, year, null);
  const totalOutcomeByYear = sumAllByYear(expensesOfYear, year);

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    const incomesOfYear = filterByYearAndMonth(response.data, year, null);
    setTotalIncomeByYear(sumAllByYear(incomesOfYear, year));
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
    <div className="d-flex text-center justify-content-center">
      <Card className={`bg-${theme} mx-3`}>
        <Card.Header>
          <h5 className="m-0">Outcome</h5>
        </Card.Header>
        <Card.Body>
          <p
            className={"value-main " + outcomeStatus(outcome, previousOutcome)}
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

      <Card className={`bg-${theme} mx-3`}>
        <Card.Header>
          <h5 className="m-0">Balance</h5>
        </Card.Header>
        <Card.Body>
          <p
            className={"value-main " + balanceStatus(balance, previousBalance)}
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

      <Card className={`bg-${theme} mx-3`}>
        <Card.Header>
          <h5 className="m-0">Saved</h5>
        </Card.Header>
        <Card.Body className="vertical-center">
          <p className={"value-main text-success"}>
            {totalIncomeByYear - totalOutcomeByYear > 0
              ? totalIncomeByYear - totalOutcomeByYear
              : 0}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SummaryComponent;
