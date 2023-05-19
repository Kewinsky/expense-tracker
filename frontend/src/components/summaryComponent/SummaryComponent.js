import { BsFillBarChartFill } from "react-icons/bs";
import "./summaryComponent.scss";

const SummaryComponent = ({
  outcome,
  previousOutcome,
  savings,
  previousSavings,
}) => {
  const outcomeStatus = (current, previous) => {
    return current > previous ? "text-danger" : "text-success";
  };

  const savingsStatus = (current, previous) => {
    return current >= previous ? "text-success" : "text-danger";
  };

  return (
    <div className="d-flex text-center justify-content-center">
      <div className="mx-3">
        <h5>Outcome</h5>
        <p className={"value-main " + outcomeStatus(outcome, previousOutcome)}>
          {outcome}
          {outcomeStatus(outcome, previousOutcome) === "text-danger" ? (
            <BsFillBarChartFill size={28} className="mx-1 mirrored" />
          ) : (
            <BsFillBarChartFill size={28} className="mx-1" />
          )}
        </p>
        <p className="value-last">{previousOutcome}</p>
      </div>
      <div className="mx-3">
        <h5>Saved</h5>
        <p className={"value-main " + savingsStatus(savings, previousSavings)}>
          {savings}
          {savingsStatus(savings, previousSavings) === "text-danger" ? (
            <BsFillBarChartFill size={28} className="mx-1 mirrored" />
          ) : (
            <BsFillBarChartFill size={28} className="mx-1" />
          )}
        </p>
        <p className="value-last">{previousSavings}</p>
      </div>
    </div>
  );
};

export default SummaryComponent;
