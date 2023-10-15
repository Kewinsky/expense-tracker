import { useContext, useState } from "react";
import {
  getTopCategories,
  getRoundedCategoryAverages,
} from "../../helpers/analyzerMethods";
import RecordComponent from "./RecordComponent";
import BarChartComponent from "../barChartComponent/BarChartComponent";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../App";
import "./categoriesSummaryComponent.scss";

const CategoriesSummaryComponent = ({
  barChartData,
  expenses,
  outcome,
  month,
}) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const borderColor = theme === "dark" ? "white" : "black";

  const currentYear = new Date().getFullYear();
  const averageValues = getRoundedCategoryAverages(expenses, currentYear);

  const [range, setRange] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChart, setIsChart] = useState(false);

  const array = getTopCategories(expenses, month, range);
  const blank_items = 5 - array.length;

  const handleOnExpand = () => {
    setIsExpanded(!isExpanded);

    if (isExpanded) {
      setRange(5);
    } else {
      setRange(undefined);
    }
  };

  const handleOnSwitch = () => {
    setIsChart(!isChart);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Top 5 Spendings</h4>
        <div>
          <Button variant={`outline-${reversedTheme}`} onClick={handleOnExpand}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
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
              <th></th>
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
            {range < 5 &&
              Array(blank_items)
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
