import UpdateComponent from "../../components/updateComponent/UpdateComponent";
const UpdatePage = ({ expense, setExpenses }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <UpdateComponent expense={expense} setExpenses={setExpenses} />
      </div>
    </div>
  );
};

export default UpdatePage;
