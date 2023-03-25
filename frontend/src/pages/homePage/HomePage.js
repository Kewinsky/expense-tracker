import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="container my-5">
      <h1>Welcome at Expense_Tracker</h1>
      <h4>
        don't hesitate to add new expense{" "}
        <a href="/tracker">
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </a>
      </h4>
    </div>
  );
};

export default HomePage;
