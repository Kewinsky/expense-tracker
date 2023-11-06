import { useEffect, useState, useContext } from "react";
import SwitchMonthComponent from "../../components/switchMonthComponent/SwitchMonthComponent";
import SummaryComponent from "../../components/summaryComponent/SummaryComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import NoteComponent from "../../components/noteComponent/NoteComponent";
import CategoriesSummaryComponent from "../../components/categoriesSummaryComponent/CategoriesSummaryComponent";
import { Chart as ChartJS } from "chart.js/auto";
import UtilitiesComponent from "../../components/utilitiesComponent/UtilitiesComponent";
import { Col, Container, Row } from "react-bootstrap";
import "./analyzerPage.scss";
import {
  sumAllMonths,
  sumAllCategories,
  sumAllByMonth,
  sumAllSteps,
  sumAllUtilitiesForChart,
} from "../../helpers/summingMethods";
import {
  noteFilterByYear,
  filterByYearAndMonth,
} from "../../helpers/filteringMethods";
import NoteService from "../../services/noteService";
import { months } from "../../helpers/monthsData";
import { ThemeContext } from "../../App";
import IncomeService from "../../services/incomeService";
import TotalOutcomeComponent from "../../components/totalOutcomeComponent/TotalOutcomeComponent";
import "./analyzerPage.scss";

const AnalyzerPage = () => {
  const currentDate = new Date();
  const { expenses } = useContext(ThemeContext);

  // SummaryComponent data
  const [incomes, setIncomes] = useState([]);
  const [income, setIncome] = useState(0);
  const [previousIncome, setPreviousIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [previousOutcome, setPreviousOutcome] = useState(0);

  // Summary Line Chart
  const [isYear, setIsYear] = useState(true);
  const [range, setRange] = useState(3);

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [notes, setNotes] = useState([]);

  // filtered expenses(outcome)/incomes
  const incomesByYear = filterByYearAndMonth(incomes, year, null);
  const expensesOfYear = filterByYearAndMonth(expenses, year, null);
  const expensesOfMonth = filterByYearAndMonth(expenses, year, month);

  // data for summary line chart
  const totalOutcomesByMonth = sumAllMonths(expensesOfYear);
  const totalOutcomesByRange = sumAllSteps(expensesOfMonth, range);

  // data for category bar chart
  const totalValuesByCategory = sumAllCategories(expensesOfMonth, year, month);

  // data for utility line chart
  const totalValuesByUtility = (utility) => {
    return sumAllUtilitiesForChart(expensesOfYear, utility);
  };

  // initial datasets for charts
  const [barChartData, setBarChartData] = useState({
    labels: totalValuesByCategory.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: totalValuesByCategory.map((data) => data.value),
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: totalOutcomesByMonth.map((item) => item.label),
    datasets: [
      {
        label: "Total Year",
        data: totalOutcomesByMonth.map((data) => data.total),
      },
    ],
  });

  const [utilitiesChartData, setUtilitiesChartData] = useState({
    labels: totalValuesByUtility("Electricity").map((item) => item.label),
    datasets: [
      {
        label: "Electricity",
        data: totalValuesByUtility("Electricity").map((data) => data.total),
      },
      {
        label: "Gas",
        data: totalValuesByUtility("Gas").map((data) => data.total),
      },
      {
        label: "Water",
        data: totalValuesByUtility("Water").map((data) => data.total),
      },
    ],
  });

  // reloading methods for charts
  const mountBarChartData = (data, label) => {
    if (data.length) {
      setBarChartData({
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: label,
            data: data.map((data) => data.value),
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

  const mountLineChartData = (data, label) => {
    if (data.length) {
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

  const mountUtilitiesChartData = (data1, data2, data3) => {
    if (data1.length) {
      setUtilitiesChartData({
        labels: data1.map((item) => item.label),
        datasets: [
          {
            label: "Electricity",
            data: data1.map((data) => data.total),
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

  const mountSummaryData = () => {
    if (isYear) {
      mountLineChartData(totalOutcomesByMonth, "Total Outcome by Year");
    } else {
      mountLineChartData(totalOutcomesByRange, "Total Outcome by Month");
    }
  };

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    setIncomes(response.data);
  };

  const getNotes = async () => {
    const response = await NoteService.getNotesByUser();
    const filteredNotes = noteFilterByYear(response.data, year);
    setNotes(filteredNotes);
  };

  // reloading method to update all charts at once
  const reloadChartData = () => {
    // required reset once no data
    if (totalValuesByCategory.length === 0) {
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
      mountBarChartData(totalValuesByCategory, "Expenses");
    }

    mountSummaryData();
    mountUtilitiesChartData(
      totalValuesByUtility("Electricity"),
      totalValuesByUtility("Gas"),
      totalValuesByUtility("Water")
    );
  };

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    reloadChartData();

    getNotes();

    setIncome(sumAllByMonth(incomesByYear, month));
    setPreviousIncome(sumAllByMonth(incomesByYear, month - 1));

    setOutcome(sumAllByMonth(expensesOfYear, month));
    setPreviousOutcome(sumAllByMonth(expensesOfYear, month - 1));
  }, [year, month, expenses]);

  useEffect(() => {
    mountSummaryData();
  }, [isYear, range]);

  return (
    <div className="mb-5">
      <SwitchMonthComponent
        months={months}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setOutcome={setOutcome}
        setPreviousOutcome={setPreviousOutcome}
        reloadChartData={reloadChartData}
      />
      <SeparatorComponent />
      <SummaryComponent
        year={year}
        income={income}
        outcome={outcome}
        previousIncome={previousIncome}
        previousOutcome={previousOutcome}
      />
      <SeparatorComponent />
      <Container>
        <Row className="justify-content-center" md={1} xl={2}>
          <Col className="p-4">
            <TotalOutcomeComponent
              chartData={lineChartData}
              range={range}
              setRange={setRange}
              isYear={isYear}
              setIsYear={setIsYear}
              periodable={true}
            />
          </Col>
          <Col className="p-4">
            <CategoriesSummaryComponent
              barChartData={barChartData}
              expensesOfYear={expensesOfYear}
              expensesOfMonth={expensesOfMonth}
              outcome={outcome}
              year={year}
            />
          </Col>
          <Col className="p-4">
            <UtilitiesComponent
              lineChartData={utilitiesChartData}
              expenses={expensesOfYear}
              month={month}
            />
          </Col>
          <Col className="p-4">
            <NoteComponent
              note={notes.find((note) => note.month === month)}
              getNotes={getNotes}
              month={month}
              year={year}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AnalyzerPage;
