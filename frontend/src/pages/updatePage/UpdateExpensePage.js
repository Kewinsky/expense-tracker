import UpdateExpenseComponent from "../../components/updateComponent/UpdateExpenseComponent";
import "./updatePage.scss";

const UpdateExpensePage = ({ expenses, setExpenses, expenseCategories }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <UpdateExpenseComponent
          expenses={expenses}
          setExpenses={setExpenses}
          expenseCategories={expenseCategories}
        />
      </div>
    </div>
  );
};

export default UpdateExpensePage;
