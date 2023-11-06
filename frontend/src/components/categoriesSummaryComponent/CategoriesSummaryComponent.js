import { useContext, useState } from "react";
import {
  getRoundedCategoryAverages,
  sumAllCategories,
} from "../../helpers/summingMethods";
import RecordComponent from "./RecordComponent";
import { Button, Card } from "react-bootstrap";
import { ThemeContext } from "../../App";
import "./categoriesSummaryComponent.scss";
import {
  BsTable,
  BsChevronContract,
  BsChevronExpand,
  BsFillPieChartFill,
} from "react-icons/bs";
import PieChartComponent from "../pieChartComponent/PieChartComponent";

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
  const iconSize = 20;

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
    <Card className={`bg-${theme} dashboard-card`}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4 className="align-self-center m-0">Top 5 Categories</h4>
          <div className="d-flex">
            {!isChart && (
              <Button
                variant={`outline-${reversedTheme}`}
                onClick={handleOnExpand}
                disabled={blankRows >= 0}
                className="mx-2"
              >
                {isExpanded ? (
                  <BsChevronContract size={iconSize} />
                ) : (
                  <BsChevronExpand size={iconSize} />
                )}
              </Button>
            )}

            <Button
              variant={`outline-${reversedTheme}`}
              onClick={handleOnSwitch}
            >
              {isChart ? (
                <BsTable size={iconSize} />
              ) : (
                <BsFillPieChartFill size={iconSize} />
              )}
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="vertical-center">
        {isChart ? (
          <PieChartComponent chartData={barChartData} />
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
      </Card.Body>
    </Card>
  );
};

export default CategoriesSummaryComponent;
