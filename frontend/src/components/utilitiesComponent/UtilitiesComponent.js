import RecordComponent from "../categoriesSummaryComponent/RecordComponent";
import { sumAllUtilitiesForTable } from "../../helpers/summingMethods";
import "./utilitiesComponent.scss";
import { ThemeContext } from "../../App";
import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import LineChartComponent from "../lineChartComponent/LineChartComponent";
import { BsTable, BsFillBarChartFill } from "react-icons/bs";
import TooltipComponent from "../tooltipComponent/TooltipComponent";
import {
  utilitiesCurrMessage,
  utilitiesPercentageMessage,
  utilitiesPrevMessage,
} from "../../utils/tooltipMassages";

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
    <Card className={`bg-${theme} dashboard-card`}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4 className="align-self-center m-0">Utilities</h4>
          <div>
            <Button
              variant={`outline-${reversedTheme}`}
              onClick={handleOnSwitch}
            >
              {isChart ? (
                <BsTable size={20} />
              ) : (
                <BsFillBarChartFill size={20} />
              )}
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="vertical-center custom-chart-height">
        {isChart ? (
          <LineChartComponent chartData={lineChartData} />
        ) : (
          <table className="utl-table">
            <thead>
              <tr className={`${borderColor}-row-color`}>
                <th></th>
                <th>
                  <TooltipComponent
                    placement={"top"}
                    message={utilitiesCurrMessage}
                  >
                    Curr
                  </TooltipComponent>
                </th>
                <th>
                  <TooltipComponent
                    placement={"top"}
                    message={utilitiesPrevMessage}
                  >
                    Prev
                  </TooltipComponent>
                </th>
                <th>
                  <TooltipComponent
                    placement={"top"}
                    message={utilitiesPercentageMessage}
                  >
                    [%]
                  </TooltipComponent>
                </th>
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
      </Card.Body>
    </Card>
  );
};

export default UtilitiesComponent;
