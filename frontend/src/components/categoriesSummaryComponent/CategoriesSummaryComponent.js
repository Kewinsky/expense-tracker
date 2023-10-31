import { useContext, useState } from "react";
import {
  getRoundedCategoryAverages,
  sumAllCategories,
} from "../../helpers/summingMethods";
import RecordComponent from "./RecordComponent";
import BarChartComponent from "../barChartComponent/BarChartComponent";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../App";
import "./categoriesSummaryComponent.scss";

const CategoriesSummaryComponent = ({
  barChartData,
  expensesOfYear,
  expensesOfMonth,
  outcome,
  year,
}) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const borderColor = theme === "dark" ? "white" : "black";

  const averageValues = getRoundedCategoryAverages(expensesOfYear, year);

  const [range, setRange] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChart, setIsChart] = useState(false);

  const allCategories = sumAllCategories(expensesOfMonth);
  const array = sumAllCategories(expensesOfMonth, range);
  const blankRows = range - allCategories.length;

  const handleOnExpand = () => {
    setIsExpanded(!isExpanded);

    setRange(isExpanded ? 5 : undefined);
  };

  const handleOnSwitch = () => {
    setIsChart(!isChart);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h4>Top 5</h4>
        <div className="d-flex">
          {!isChart && (
            <Button
              variant={`outline-${reversedTheme}`}
              onClick={handleOnExpand}
              disabled={blankRows >= 0}
              className="mx-2"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          )}

          <Button variant={`outline-${reversedTheme}`} onClick={handleOnSwitch}>
            {isChart ? "Table" : "Chart"}
          </Button>
        </div>
      </div>
      {isChart ? (
        <BarChartComponent chartData={barChartData} />
      ) : (
        <table className="summary-table">
          <thead>
            <tr className={`${borderColor}-row-color`}>
              <th>Title</th>
              <th>Value</th>
              <th>Average</th>
              <th>[%]</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => {
              const averageValue = averageValues.find(
                (avg) => avg.category === item.category
              );

              const percentageOfTotal = Math.round(
                (item.value / outcome) * 100
              );

              return (
                <RecordComponent
                  key={index}
                  title={item.category}
                  value1={item.value}
                  value2={averageValue.average}
                  value3={percentageOfTotal}
                />
              );
            })}
            {allCategories.length < range &&
              Array(blankRows)
                .fill()
                .map((_, index) => (
                  <RecordComponent
                    key={`blank_${index}`}
                    title={"-"}
                    value1={0}
                    value2={0}
                    value3={0}
                  />
                ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CategoriesSummaryComponent;
