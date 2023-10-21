import { BsFillBarChartFill } from "react-icons/bs";
import "./summaryComponent.scss";

const SummaryComponent = ({
  income,
  outcome,
  previousIncome,
  previousOutcome,
}) => {
  const outcomeStatus = (current, previous) => {
    return current > previous ? "text-danger" : "text-success";
  };

  const balanceStatus = (current, previous) => {
    return current < 0 || current > Math.abs(previous)
      ? "text-danger"
      : "text-success";
  };

  const balance = income - outcome;
  const previousBalance = previousIncome - previousOutcome;

  return (
    <div className="d-flex text-center justify-content-center">
      <div className="mx-3">
        <h5>Outcome</h5>
        <p className={"value-main " + outcomeStatus(outcome, previousOutcome)}>
          {outcome}
          {outcomeStatus(outcome, previousOutcome) === "text-danger" ? (
            <BsFillBarChartFill size={28} className="mx-1" />
          ) : (
            <BsFillBarChartFill size={28} className="mx-1 mirrored" />
          )}
        </p>
        <p className="value-last">{previousOutcome}</p>
      </div>
      <div className="mx-3">
        <h5>Balance</h5>
        <p className={"value-main " + balanceStatus(balance, previousBalance)}>
          {balance}
          {balanceStatus(balance, previousBalance) === "text-danger" ? (
            <BsFillBarChartFill size={28} className="mx-1" />
          ) : (
            <BsFillBarChartFill size={28} className="mx-1 mirrored" />
          )}
        </p>
        <p className="value-last">{previousBalance}</p>
      </div>
    </div>
  );
};

export default SummaryComponent;
