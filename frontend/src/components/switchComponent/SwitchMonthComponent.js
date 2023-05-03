import "./switchMonthComponent.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { getSavedSum, sumAllByMonth } from "../../helpers/analyzerMethods";

const SwitchMonthComponent = ({
  expenses,
  months,
  month,
  setMonth,
  setOutcome,
  setPreviousOutcome,
  setSavings,
  setPreviousSavings,
}) => {
  const handleRightButton = () => {
    if (month < 11) {
      month = month + 1;
      setMonth(month);
      setOutcome(sumAllByMonth(expenses, month));
      setPreviousOutcome(sumAllByMonth(expenses, month - 1));
      setSavings(getSavedSum(expenses, month));
      setPreviousSavings(getSavedSum(expenses, month - 1));
    }
  };

  const handleLeftButton = () => {
    if (month > 0) {
      month = month - 1;
      setMonth(month);
      setOutcome(sumAllByMonth(expenses, month));
      setPreviousOutcome(sumAllByMonth(expenses, month - 1));
      setSavings(getSavedSum(expenses, month));
      setPreviousSavings(getSavedSum(expenses, month - 1));
    }
  };
  return (
    <div className="switch-container">
      <Link variant="outline-dark" onClick={handleLeftButton}>
        <BsFillArrowLeftCircleFill size={28} color="#212529" />
      </Link>
      <h5 className="month-title">{months[month]}</h5>
      <Link variant="outline-dark" onClick={handleRightButton}>
        <BsFillArrowRightCircleFill size={28} color="#212529" />
      </Link>
    </div>
  );
};

export default SwitchMonthComponent;
