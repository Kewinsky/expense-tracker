import UpdateExpenseComponent from "../../components/updateComponent/UpdateExpenseComponent";
const UpdateExpensePage = ({ expenses, setExpenses, expenseCategories }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
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
