import { BsFillBarChartFill } from "react-icons/bs";
import "./summaryComponent.scss";

const SummaryComponent = ({ outcome, previousOutcome }) => {
  const outcomeStatus = (current, previous) => {
    return current > previous ? "text-danger" : "text-success";
  };

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
    </div>
  );
};

export default SummaryComponent;
