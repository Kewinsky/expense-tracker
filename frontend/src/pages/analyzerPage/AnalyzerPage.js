import { useEffect, useState, useContext } from "react";
import SwitchMonthComponent from "../../components/switchMonthComponent/SwitchMonthComponent";
import SummaryComponent from "../../components/summaryComponent/SummaryComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import LineChartComponent from "../../components/lineChartComponent/LineChartComponent";
import NoteComponent from "../../components/noteComponent/NoteComponent";
import CategoriesSummaryComponent from "../../components/categoriesSummaryComponent/CategoriesSummaryComponent";
import { Chart as ChartJS } from "chart.js/auto";
import UtilitiesComponent from "../../components/utilitiesComponent/UtilitiesComponent";
import { Col, Container, Row } from "react-bootstrap";
import "./analyzerPage.scss";
import {
  sumAllByMonth,
  sumAllMonths,
  getSumCategories,
  sumAllByRange,
  sumUtilityByYear,
} from "../../helpers/analyzerMethods";
import {
  expenseFilterByMonthAndYear,
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
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [isYear, setIsYear] = useState(true);
  const [range, setRange] = useState(3);

  const expensesOfYear = expenseFilterByYear(expenses, parseInt(year));
  const totalOutcomeByMonth = sumAllMonths(expensesOfYear);
  const expensesOfMonth = expenseFilterByMonthAndYear(
    expenses,
    parseInt(year),
    parseInt(month)
  );
  const totalOutcomeByRange = sumAllByRange(expensesOfMonth, range);

  const sumByCategory = getSumCategories(
    expensesOfMonth,
    parseInt(year),
    month
  );

  const totalUtilityByYear = (utility) => {
    return sumUtilityByYear(expenses, parseInt(year), utility);
  };

  // charts data
  const [barChartData, setBarChartData] = useState({
    labels: sumByCategory.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: sumByCategory.map((data) => data.value),
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: totalOutcomeByMonth.map((item) => item.label),
    datasets: [
      {
        label: "Total Year",
        data: totalOutcomeByMonth.map((data) => data.total),
      },
    ],
  });

  const [utilitiesChartData, setUtilitiesChartData] = useState({
    labels: totalUtilityByYear("Electricity").map((item) => item.label),
    datasets: [
      {
        label: "Electricity",
        data: totalUtilityByYear("Electricity").map((data) => data.total),
      },
      {
        label: "Gas",
        data: totalUtilityByYear("Gas").map((data) => data.total),
      },
      {
        label: "Water",
        data: totalUtilityByYear("Water").map((data) => data.total),
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
          },
        ],
      });
    }
  };

  const mountLineChartData = (data, items, label) => {
    if (items.length) {
      setLineChartData({
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: label,
            data: data.map((data) => data.total),
          },
        ],
      });
    }
  };

  const mountUtilitiesChartData = (data1, data2, data3, items) => {
    if (items.length) {
      setUtilitiesChartData({
        labels: data1.map((item) => item.label),
        datasets: [
          {
            label: "Electricity",
            data: data1.map((item) => item.total),
          },
          {
            label: "Gas",
            data: data2.map((data) => data.total),
          },
          {
            label: "Water",
            data: data3.map((data) => data.total),
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

  const filterExpenses = () => {
    if (sumByCategory.length === 0) {
      setBarChartData({
        labels: [],
        datasets: [
          {
            label: "Expenses",
            data: [],
          },
        ],
      });
    } else {
      mountBarChartData(sumByCategory, "Expenses");
    }
    mountLineChartData(totalOutcomeByMonth, expenses, "Total Outcome by Year");
    mountUtilitiesChartData(
      totalUtilityByYear("Electricity"),
      totalUtilityByYear("Gas"),
      totalUtilityByYear("Water"),
      expenses
    );
  };

  useEffect(() => {
    filterExpenses(year, month);
    getNotes();
    setOutcome(sumAllByMonth(expensesOfYear, month));
    setPreviousOutcome(sumAllByMonth(expensesOfYear, month - 1));
    // setSavings(getSavedSum(expensesOfYear, month));
    // setPreviousSavings(getSavedSum(expensesOfYear, month - 1));
    setIsYear(true);
  }, [year, month, expenses]);

  useEffect(() => {
    if (isYear) {
      mountLineChartData(
        totalOutcomeByMonth,
        expenses,
        "Total Outcome by Year"
      );
    } else {
      mountLineChartData(
        totalOutcomeByRange,
        expenses,
        "Total Outcome by Month"
      );
    }
  }, [isYear, range]);

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
        filterExpenses={filterExpenses}
      />
      <SeparatorComponent />

      <SummaryComponent outcome={outcome} previousOutcome={previousOutcome} />

      <SeparatorComponent />
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12 col-lg-6 p-4">
            <LineChartComponent
              chartData={lineChartData}
              range={range}
              setRange={setRange}
              isYear={isYear}
              setIsYear={setIsYear}
              periodable={true}
              header={"Outcome Summary"}
            />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <CategoriesSummaryComponent
              barChartData={barChartData}
              expenses={expensesOfYear}
              outcome={outcome}
              year={parseInt(year)}
              month={month}
            />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <UtilitiesComponent
              lineChartData={utilitiesChartData}
              expenses={expensesOfYear}
              month={month}
            />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <NoteComponent
              note={notes.find((note) => note.month === month)}
              getNotes={getNotes}
              month={month}
              year={year}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyzerPage;
