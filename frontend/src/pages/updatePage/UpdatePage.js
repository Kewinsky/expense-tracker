import UpdateExpenseComponent from "../../components/updateComponent/UpdateExpenseComponent";
const UpdatePage = ({ expenses, setExpenses }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateExpenseComponent expenses={expenses} setExpenses={setExpenses} />
      </div>
    </div>
  );
};

export default UpdatePage;
