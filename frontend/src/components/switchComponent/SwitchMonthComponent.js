import "./switchMonthComponent.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { getSavedSum, sumAllByMonth } from "../../helpers/analyzerMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const SwitchMonthComponent = ({
  expenses,
  months,
  month,
  setMonth,
  setOutcome,
  setPreviousOutcome,
  setSavings,
  setPreviousSavings,
  filterExpenses,
  theme,
}) => {
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const handleRightButton = () => {
    if (month < 11) {
      month = month + 1;
      setMonth(month);
      setOutcome(sumAllByMonth(expenses, month));
      setPreviousOutcome(sumAllByMonth(expenses, month - 1));
      setSavings(getSavedSum(expenses, month));
      setPreviousSavings(getSavedSum(expenses, month - 1));
      filterExpenses(month);
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
      filterExpenses(month);
    }
  };
  return (
    <div className="switch-container">
      <Link className={`link-${reversedTheme}`} onClick={handleLeftButton}>
        <BsFillArrowLeftCircleFill size={28} />
      </Link>
      <h5 className="month-title">{months[month]}</h5>
      <Link className={`link-${reversedTheme}`} onClick={handleRightButton}>
        <BsFillArrowRightCircleFill size={28} />
      </Link>
    </div>
  );
};

export default SwitchMonthComponent;
