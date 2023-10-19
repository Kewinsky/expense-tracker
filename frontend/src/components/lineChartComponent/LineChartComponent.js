import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Button } from "react-bootstrap";
import SelectComponent from "../selectComponent/SelectComponent";
import { dropdownData } from "../../helpers/dropdownData";
const LineChartComponent = ({
  chartData,
  range,
  setRange,
  isYear,
  setIsYear,
  periodable,
  header,
}) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const availableRanges = [1, 3, 5];

  const handleOnSwitch = () => {
    setIsYear(!isYear);
  };

  const handleSelectRange = (e) => {
    setRange(e.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        {header && <h4>{header}</h4>}
        {periodable && (
          <div className="d-flex">
            {!isYear && (
              <SelectComponent
                options={dropdownData(availableRanges)}
                value={{ value: range, label: range }}
                handleSelect={handleSelectRange}
                placeholder={"Select"}
                theme={`${theme}Theme`}
              />
            )}

            <Button
              variant={`outline-${reversedTheme}`}
              onClick={handleOnSwitch}
            >
              {isYear ? "Month" : "Year"}
            </Button>
          </div>
        )}
      </div>
      <Line data={chartData} />
    </>
  );
};

export default LineChartComponent;
