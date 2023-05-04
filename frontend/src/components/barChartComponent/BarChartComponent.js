import { Bar } from "react-chartjs-2";

const BarChartComponent = ({ chartData }) => {
  return (
    <>
      <h4>Bar chart</h4>
      <Bar data={chartData} />
    </>
  );
};

export default BarChartComponent;
