import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import SortableTableComponent from "../../components/tableComponent/SortableTableComponent";

const TrackerPage = ({ expenses, setExpenses }) => {
  return (
    <>
      <AddComponent expenses={expenses} setExpenses={setExpenses} />
      <SeparatorComponent />
      <SortableTableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
