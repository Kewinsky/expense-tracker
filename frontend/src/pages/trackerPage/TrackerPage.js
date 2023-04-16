import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import SortableTableComponent from "../../components/tableComponent/SortableTableComponent";
import { useEffect } from "react";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const TrackerPage = ({ expenses, setExpenses, currentUser }) => {
  const navigate = useNavigate();

  // TODO: currentUser
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

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
