import { getTopCategories } from "../../helpers/analyzerMethods";
import RecordComponent from "./RecordComponent";

const CategoriesSummaryComponent = ({ expenses, month }) => {
  const array = getTopCategories(expenses, month);
  const blank_items = 5 - array.length;
  return (
    <>
      <h4>Top 5 Spendings</h4>
      {array.map((item) => (
        <RecordComponent title={item.category} value={item.value} />
      ))}
      {Array(blank_items).fill(<RecordComponent title={"-"} value={0} />)}
    </>
  );
};

export default CategoriesSummaryComponent;
