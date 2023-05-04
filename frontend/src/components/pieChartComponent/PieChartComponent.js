import { Pie } from "react-chartjs-2";

const PieChartComponent = ({ chartData }) => {
  return <Pie className="chart-width" data={chartData} />;
};

export default PieChartComponent;
