import RecordComponent from "../categoriesSummaryComponent/RecordComponent";
import { sumAllUtilitiesForTable } from "../../helpers/summingMethods";
import "./utilitiesComponent.scss";
import { ThemeContext } from "../../App";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import LineChartComponent from "../lineChartComponent/LineChartComponent";

const UtilitiesComponent = ({ lineChartData, expenses, month }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const borderColor = theme === "dark" ? "white" : "black";

  const [isChart, setIsChart] = useState(false);

  const currentMonthUtilities = sumAllUtilitiesForTable(expenses, month);
  const prevMonthUtilities = sumAllUtilitiesForTable(expenses, month - 1);

  const handleOnSwitch = () => {
    setIsChart(!isChart);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h4>Utilities</h4>
        <div>
          <Button variant={`outline-${reversedTheme}`} onClick={handleOnSwitch}>
            {isChart ? "Table" : "Chart"}
          </Button>
        </div>
      </div>
      {isChart ? (
        <LineChartComponent chartData={lineChartData} />
      ) : (
        <table className="utl-table">
          <thead>
            <tr className={`${borderColor}-row-color`}>
              <th></th>
              <th>Curr</th>
              <th>Prev</th>
              <th>[%]</th>
            </tr>
          </thead>
          <tbody>
            {currentMonthUtilities.map((item, index) => {
              const currMonthUtil = item.value;
              const prevMonthUtil = prevMonthUtilities[index].value;
              const percentageDiff =
                prevMonthUtil === 0
                  ? 0
                  : Math.round(
                      ((currMonthUtil - prevMonthUtil) / prevMonthUtil) * 100
                    );
              return (
                <RecordComponent
                  key={index}
                  title={item.title.toUpperCase()}
                  type={"utilities"}
                  value1={currMonthUtil}
                  value2={prevMonthUtil}
                  value3={percentageDiff}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UtilitiesComponent;
