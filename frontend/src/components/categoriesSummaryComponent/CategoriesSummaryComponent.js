import RecordComponent from "./RecordComponent";

const CategoriesSummaryComponent = () => {
  return (
    <>
      <h4>Top 5 Spendings</h4>
      <RecordComponent title={"Food"} value={100} />
      <RecordComponent title={"Food"} value={100} />
      <RecordComponent title={"Food"} value={100} />
      <RecordComponent title={"Food"} value={100} />
      <RecordComponent title={"Food"} value={100} />
    </>
  );
};

export default CategoriesSummaryComponent;
