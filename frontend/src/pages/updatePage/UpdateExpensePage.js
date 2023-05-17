import { Row } from "react-bootstrap";
import UpdateExpenseComponent from "../../components/updateComponent/UpdateExpenseComponent";
const UpdateExpensePage = ({ expenses, setExpenses, expenseCategories }) => {
  return (
    <div className="d-flex justify-content-center">
      <Row className="col col-md-6 m-3">
        <UpdateExpenseComponent
          expenses={expenses}
          setExpenses={setExpenses}
          expenseCategories={expenseCategories}
        />
      </Row>
    </div>
  );
};

export default UpdateExpensePage;
