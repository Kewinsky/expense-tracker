import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";

const TrackerPage = ({ expenses, setExpenses }) => {
  return (
    <>
      <AddComponent expenses={expenses} setExpenses={setExpenses} />
      <SeparatorComponent />
      <TableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
