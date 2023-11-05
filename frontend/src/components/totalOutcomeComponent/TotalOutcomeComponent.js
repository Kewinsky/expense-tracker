import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Button, Card } from "react-bootstrap";
import SelectComponent from "../selectComponent/SelectComponent";
import { dropdownData } from "../../helpers/dropdownData";

const TotalOutcomeComponent = ({
  chartData,
  range,
  setRange,
  isYear,
  setIsYear,
  periodable,
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
    <Card className={`bg-${theme} dashboard-card`}>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h4 className="align-self-center m-0">
            Total
            {isYear ? " Year" : " Month"}
          </h4>
          {periodable && (
            <div className="d-flex">
              {!isYear && (
                <div className="mx-2">
                  <SelectComponent
                    options={dropdownData(availableRanges)}
                    value={{ value: range, label: range }}
                    handleSelect={handleSelectRange}
                    placeholder={"Select"}
                    theme={`${theme}Theme`}
                  />
                </div>
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
      </Card.Header>
      <Card.Body className="vertical-center">
        <Line data={chartData} />
      </Card.Body>
    </Card>
  );
};

export default TotalOutcomeComponent;
