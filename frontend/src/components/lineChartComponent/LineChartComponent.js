import { Line } from "react-chartjs-2";

const LineChartComponent = ({ chartData }) => {
  return (
    <>
      <h4>Year Summary</h4>
      <Line data={chartData} />
    </>
  );
};

export default LineChartComponent;
