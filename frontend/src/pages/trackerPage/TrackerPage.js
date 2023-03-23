import { useState } from "react";
import AddComponent from "../../components/addComponent/AddComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import TableComponent from "../../components/tableComponent/TableComponent";

const TrackerPage = () => {
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <AddComponent />
      <SeparatorComponent />
      <TableComponent expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default TrackerPage;
