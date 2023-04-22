import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import SortableTableComponent from "../../components/tableComponent/SortableTableComponent";
import { useNavigate } from "react-router-dom";

const TrackerPage = ({ expenses, setExpenses, currentUser }) => {
  const navigate = useNavigate();

  // TODO: navigate does not work
  if (!currentUser) {
    navigate("/login");
  }

  return (
    <>
      <AddComponent
        expenses={expenses}
        setExpenses={setExpenses}
        currentUser={currentUser}
      />
      <SeparatorComponent />
      <SortableTableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
