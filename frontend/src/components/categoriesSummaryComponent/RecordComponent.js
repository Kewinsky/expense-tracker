import "./categoriesSummaryComponent.scss";

const RecordComponent = ({ title, value }) => {
  return (
    <>
      <div className="d-flex justify-content-between record-item my-4">
        <span>{title}</span>
        <span>{value}</span>
      </div>
    </>
  );
};

export default RecordComponent;
