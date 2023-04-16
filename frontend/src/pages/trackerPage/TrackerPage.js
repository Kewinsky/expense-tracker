import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import SortableTableComponent from "../../components/tableComponent/SortableTableComponent";

const TrackerPage = ({
  expenses,
  setExpenses,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <>
      <AddComponent
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <SeparatorComponent />
      <SortableTableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
