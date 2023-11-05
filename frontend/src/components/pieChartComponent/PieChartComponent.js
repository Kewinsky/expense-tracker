import { Pie } from "react-chartjs-2";

const PieChartComponent = ({ chartData }) => {
  return <Pie data={chartData} />;
};

export default PieChartComponent;
