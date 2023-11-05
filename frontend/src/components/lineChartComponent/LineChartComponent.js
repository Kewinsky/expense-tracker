import { Line } from "react-chartjs-2";

const LineChartComponent = ({ chartData }) => {
  return <Line data={chartData} />;
};

export default LineChartComponent;
