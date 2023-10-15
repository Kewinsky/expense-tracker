import { useEffect, useState, useContext } from "react";
import SwitchMonthComponent from "../../components/switchMonthComponent/SwitchMonthComponent";
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
  getSavedSumForYear,
  getSavedSumByMonth,
} from "../../helpers/analyzerMethods";
import {
  expenseFilter,
  expenseFilterByYear,
} from "../../helpers/expenseFilter";
import NoteService from "../../services/noteService";
import { noteFilterByYear } from "../../helpers/noteFilter";
import { getYearArray } from "../../helpers/yearData";
import { months } from "../../helpers/monthsData";
import { ThemeContext } from "../../App";

const AnalyzerPage = () => {
  const currentDate = new Date();
  const years = getYearArray();
  const { expenses } = useContext(ThemeContext);

  const [notes, setNotes] = useState([]);
  const [outcome, setOutcome] = useState(0);
  const [previousOutcome, setPreviousOutcome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [previousSavings, setPreviousSavings] = useState(0);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const expensesOfYear = expenseFilterByYear(expenses, parseInt(year));
  const totalOutcomeByMonth = sumAllMonths(expensesOfYear);

  // charts data
  const [barChartData, setBarChartData] = useState({
    labels: filteredExpenses.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: filteredExpenses.map((data) => data.value),
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: totalOutcomeByMonth.map((item) => item.month),
    datasets: [
      {
        label: "Total Year",
        data: totalOutcomeByMonth.map((data) => data.total),
      },
    ],
  });

  const mountBarChartData = (items, label) => {
    if (items.length) {
      setBarChartData({
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

  const mountLineChartData = (items, label) => {
    if (items.length) {
      setLineChartData({
        labels: totalOutcomeByMonth.map((item) => item.month),
        datasets: [
          {
            label: label,
            data: totalOutcomeByMonth.map((data) => data.total),
          },
        ],
      });
    }
  };

  const getNotes = async () => {
    const response = await NoteService.getNotesByUser();
    const filteredNotes = noteFilterByYear(response.data, parseInt(year));
    setNotes(filteredNotes);
  };

  const filterExpenses = (year, month) => {
    const response = expenseFilter(expenses, parseInt(year), month, null);
    setFilteredExpenses(response);
    mountBarChartData(getSumCategories(response, month), "Expenses");
    mountLineChartData(expenses, "Total Outcome");
  };

  useEffect(() => {
    filterExpenses(year, month);
    getNotes();
    setOutcome(sumAllByMonth(expensesOfYear, month));
    setPreviousOutcome(sumAllByMonth(expensesOfYear, month - 1));
    setSavings(getSavedSum(expensesOfYear, month));
    setPreviousSavings(getSavedSum(expensesOfYear, month - 1));
  }, [year, expenses]);

  return (
    <>
      <SwitchMonthComponent
        expensesOfYear={expensesOfYear}
        month={month}
        setMonth={setMonth}
        months={months}
        year={year}
        setYear={setYear}
        years={years}
        currentDate={currentDate}
        setOutcome={setOutcome}
        setPreviousOutcome={setPreviousOutcome}
        setSavings={setSavings}
        setPreviousSavings={setPreviousSavings}
        filterExpenses={filterExpenses}
        setFilteredExpenses={setFilteredExpenses}
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
            <CategoriesSummaryComponent
              barChartData={barChartData}
              expenses={expensesOfYear}
              outcome={outcome}
              month={month}
            />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <UtilitiesComponent expenses={expensesOfYear} month={month} />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <NoteComponent
              note={notes.find((note) => note.month === month)}
              getNotes={getNotes}
              month={month}
              year={year}
            />
          </Col>
          {outcome !== 0 ? (
            <Col className="col-12 col-lg-6 p-4">
              <PieChartComponent chartData={barChartData} />
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default AnalyzerPage;
