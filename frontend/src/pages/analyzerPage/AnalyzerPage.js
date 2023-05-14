import { useEffect, useState } from "react";
import SwitchMonthComponent from "../../components/switchComponent/SwitchMonthComponent";
import SummaryComponent from "../../components/summaryComponent/SummaryComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import LineChartComponent from "../../components/lineChartComponent/LineChartComponent";
import PieChartComponent from "../../components/pieChartComponent/PieChartComponent";
import NoteComponent from "../../components/noteComponent/NoteComponent";
import CategoriesSummaryComponent from "../../components/categoriesSummaryComponent/CategoriesSummaryComponent";
import { Chart as ChartJS } from "chart.js/auto";
import UtilitiesComponent from "../../components/utilitiesComponent/UtilitiesComponent";
import { Col, Container, Row } from "react-bootstrap";
import "./analyzerPage.scss";
import {
  getSavedSum,
  sumAllByMonth,
  sumAllMonths,
  getSumCategories,
} from "../../helpers/analyzerMethods";
import { expenseFilter } from "../../helpers/expenseFilter";

const AnalyzerPage = ({ expenses, months, theme }) => {
  const currentDate = new Date();
  const totalSumByMonth = sumAllMonths(expenses);

  // summary info
  const [outcome, setOutcome] = useState(0);
  const [previousOutcome, setPreviousOutcome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [previousSavings, setPreviousSavings] = useState(0);

  const [month, setMonth] = useState(currentDate.getMonth());
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // charts data
  const [pieChartData, setPieChartData] = useState({
    labels: filteredExpenses.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: filteredExpenses.map((data) => data.value),
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: totalSumByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Total Year",
        data: totalSumByMonth.map((data) => data.total),
      },
    ],
  });

  const mountPieChartData = (items, label) => {
    if (items.length) {
      setPieChartData({
        labels: items.map((item) => item.category),
        datasets: [
          {
            label: label,
            data: items.map((data) => data.value),
            backgroundColor: [
              "#35A3EB",
              "#FF6383",
              "#4BC0C0",
              "#FF9E40",
              "#9966FE",
              "#FFCD56",
              "#C8CBCF",
              "#FFD6C4",
            ],
          },
        ],
      });
    }
  };

  const mountLineChart = (items, label) => {
    if (items.length) {
      setLineChartData({
        labels: totalSumByMonth.map((item) => item.month),
        datasets: [
          {
            label: label,
            data: totalSumByMonth.map((data) => data.total),
          },
        ],
      });
    }
  };

  const filterExpenses = (month) => {
    const response = expenseFilter(expenses, month, null);
    setFilteredExpenses(response);
    mountPieChartData(getSumCategories(response, month), "Expenses");
    mountLineChart(expenses, "Total of Year");
  };

  useEffect(() => {
    filterExpenses(month);
    setOutcome(sumAllByMonth(expenses, month));
    setPreviousOutcome(sumAllByMonth(expenses, month - 1));
    setSavings(getSavedSum(expenses, month));
    setPreviousSavings(getSavedSum(expenses, month - 1));
  }, [expenses]);

  return (
    <>
      <SwitchMonthComponent
        expenses={expenses}
        month={month}
        setMonth={setMonth}
        months={months}
        currentDate={currentDate}
        setOutcome={setOutcome}
        setPreviousOutcome={setPreviousOutcome}
        setSavings={setSavings}
        setPreviousSavings={setPreviousSavings}
        filterExpenses={filterExpenses}
        setFilteredExpenses={setFilteredExpenses}
        theme={theme}
      />
      <SummaryComponent
        outcome={outcome}
        previousOutcome={previousOutcome}
        savings={savings}
        previousSavings={previousSavings}
      />
      <SeparatorComponent />
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12 col-lg-6 p-4">
            <LineChartComponent chartData={lineChartData} />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <CategoriesSummaryComponent expenses={expenses} month={month} />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <UtilitiesComponent expenses={expenses} month={month} />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <NoteComponent />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <PieChartComponent chartData={pieChartData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyzerPage;
