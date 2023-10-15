import RecordComponent from "../categoriesSummaryComponent/RecordComponent";
import { sumUtilities } from "../../helpers/analyzerMethods";
import "./utilitiesComponent.scss";
import { ThemeContext } from "../../App";
import { useContext } from "react";

const UtilitiesComponent = ({ expenses, month }) => {
  const { theme } = useContext(ThemeContext);
  const borderColor = theme === "dark" ? "white" : "black";

  const currentMonthUtilities = sumUtilities(expenses, month);
  const prevMonthUtilities = sumUtilities(expenses, month - 1);

  return (
    <>
      <h4>Utilities</h4>
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
    </>
  );
};

export default UtilitiesComponent;
