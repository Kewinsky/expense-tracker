import RecordComponent from "../categoriesSummaryComponent/RecordComponent";
const UtilitiesComponent = () => {
  return (
    <>
      <h4>Utilities</h4>
      <RecordComponent title={"Gas"} value={100} />
      <RecordComponent title={"Water"} value={100} />
      <RecordComponent title={"Electricity"} value={100} />
      <RecordComponent title={"Fee"} value={100} />
      <RecordComponent title={"Raty"} value={100} />
    </>
  );
};

export default UtilitiesComponent;
