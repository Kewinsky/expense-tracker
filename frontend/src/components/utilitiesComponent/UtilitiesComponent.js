import RecordComponent from "../categoriesSummaryComponent/RecordComponent";
import { sumUtilities } from "../../helpers/analyzerMethods";
const UtilitiesComponent = ({ expenses, month }) => {
  const array = sumUtilities(expenses, month);

  return (
    <>
      <h4>Utilities</h4>
      {array.map((item) => (
        <RecordComponent title={item.title.toUpperCase()} value={item.value} />
      ))}
    </>
  );
};

export default UtilitiesComponent;
