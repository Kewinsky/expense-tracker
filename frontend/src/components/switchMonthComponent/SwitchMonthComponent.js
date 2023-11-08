import "./switchMonthComponent.scss";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { sumAllByMonth } from "../../helpers/summingMethods";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { getYearArray } from "../../utils/yearData";
import { Button } from "react-bootstrap";

const SwitchMonthComponent = ({
  months,
  month,
  setMonth,
  year,
  setYear,
  setOutcome,
  setPreviousOutcome,
  reloadChartData,
}) => {
  const { expenses, theme } = useContext(ThemeContext);
  const years = getYearArray();
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const handleRightButton = () => {
    if (month < 11) {
      month = month + 1;
      handleUpdateData();
    }
  };

  const handleLeftButton = () => {
    if (month > 0) {
      month = month - 1;
      handleUpdateData();
    }
  };

  const handleUpdateData = () => {
    setMonth(month);
    setOutcome(sumAllByMonth(expenses, month));
    setPreviousOutcome(sumAllByMonth(expenses, month - 1));
    reloadChartData(year, month);
  };

  const handleYearChange = (e) => {
    e.preventDefault();

    setYear(parseInt(e.target.value));
    reloadChartData(year, month);
  };

  return (
    <div className="d-flex justify-content-center align-items-center pt-3">
      <Button variant={`outline-${reversedTheme}`} onClick={handleLeftButton}>
        <BsArrowLeft size={25} />
      </Button>
      <div className="d-flex flex-column flex-md-row justify-content-center switch-middle text-center">
        <span>{months[month]}</span>
        <span>
          <select
            value={year}
            onChange={handleYearChange}
            className={`year-selector select-${theme}`}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </span>
      </div>
      <Button variant={`outline-${reversedTheme}`} onClick={handleRightButton}>
        <BsArrowRight size={25} />
      </Button>
    </div>
  );
};

export default SwitchMonthComponent;
