import "./switchMonthComponent.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { getSavedSum, sumAllByMonth } from "../../helpers/analyzerMethods";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const SwitchMonthComponent = ({
  expensesOfYear,
  months,
  years,
  month,
  setMonth,
  year,
  setYear,
  setOutcome,
  setPreviousOutcome,
  setSavings,
  setPreviousSavings,
  filterExpenses,
}) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const handleRightButton = () => {
    if (month < 11) {
      month = month + 1;
      setMonth(month);
      setOutcome(sumAllByMonth(expensesOfYear, month));
      setPreviousOutcome(sumAllByMonth(expensesOfYear, month - 1));
      setSavings(getSavedSum(expensesOfYear, month));
      setPreviousSavings(getSavedSum(expensesOfYear, month - 1));
      filterExpenses(year, month);
    }
  };

  const handleLeftButton = () => {
    if (month > 0) {
      month = month - 1;
      setMonth(month);
      setOutcome(sumAllByMonth(expensesOfYear, month));
      setPreviousOutcome(sumAllByMonth(expensesOfYear, month - 1));
      setSavings(getSavedSum(expensesOfYear, month));
      setPreviousSavings(getSavedSum(expensesOfYear, month - 1));
      filterExpenses(year, month);
    }
  };

  const handleYearChange = (e) => {
    e.preventDefault();
    setYear(e.target.value);
    filterExpenses(year, month);
  };

  return (
    <div className="switch-container">
      <Link className={`link-${reversedTheme}`} onClick={handleLeftButton}>
        <BsFillArrowLeftCircleFill size={28} />
      </Link>
      <div className="text-center">
        <h5 className="month-title">{months[month]}</h5>
        <select
          value={year}
          onChange={handleYearChange}
          className={`select-${theme}`}
        >
          {years.map((year) => (
            <option key={year} value={year} className="month-title">
              {year}
            </option>
          ))}
        </select>
      </div>
      <Link className={`link-${reversedTheme}`} onClick={handleRightButton}>
        <BsFillArrowRightCircleFill size={28} />
      </Link>
    </div>
  );
};

export default SwitchMonthComponent;
