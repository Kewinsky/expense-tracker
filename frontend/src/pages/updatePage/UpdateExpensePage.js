import UpdateExpenseComponent from "../../components/updateComponent/UpdateExpenseComponent";
import "./updatePage.scss";

const UpdateExpensePage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <UpdateExpenseComponent />
      </div>
    </div>
  );
};

export default UpdateExpensePage;
