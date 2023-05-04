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
    return current < previous ? "text-danger" : "text-success";
  };

  return (
    <div className="d-flex text-center justify-content-center">
      <div className="mx-5">
        <h5>Outcome</h5>
        <p className={"value-main " + outcomeStatus(outcome, previousOutcome)}>
          {outcome}
        </p>
        <p className="value-last">{previousOutcome}</p>
      </div>
      <div className="mx-5">
        <h5>Saved</h5>
        <p className={"value-main " + savingsStatus(savings, previousSavings)}>
          {savings}
        </p>
        <p className="value-last">{previousSavings}</p>
      </div>
    </div>
  );
};

export default SummaryComponent;
