import "./summaryComponent.scss";

const SummaryComponent = () => {
  const current = 3500;
  const last = 3000;

  const status = current > last ? "text-danger" : "text-success";

  return (
    <div className="d-flex text-center justify-content-center">
      <div className="mx-5">
        <h5>Outcome</h5>
        <p className={"value-main " + status}>3500</p>
        <p className="value-last">3000</p>
      </div>
      <div className="mx-5">
        <h5>Saved</h5>
        <p className={"value-main " + status}>1500</p>
        <p className="value-last">2000</p>
      </div>
    </div>
  );
};

export default SummaryComponent;
