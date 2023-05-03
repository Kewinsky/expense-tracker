import { useEffect, useState } from "react";
import SwitchMonthComponent from "../../components/switchComponent/SwitchMonthComponent";
import SummaryComponent from "../../components/summaryComponent/SummaryComponent";
import SeparatorComponent from "../../components/separatorComponent/SeparatorComponent";
import LineChartComponent from "../../components/lineChartComponent/LineChartComponent";
import PieChartComponent from "../../components/pieChartComponent/PieChartComponent";
import NoteComponent from "../../components/noteComponent/NoteComponent";
import CategoriesSummaryComponent from "../../components/categoriesSummaryComponent/CategoriesSummaryComponent";
import { exampleData } from "../../helpers/exampleData";
import { Chart as ChartJS } from "chart.js/auto";
import UtilitiesComponent from "../../components/utilitiesComponent/UtilitiesComponent";
import { Col, Container, Row } from "react-bootstrap";
import "./analyzerPage.scss";
import { getSavedSum, sumAllByMonth } from "../../helpers/analyzerMethods";

const AnalyzerPage = ({ expenses, months }) => {
  const currentDate = new Date();

  // summary info
  const [outcome, setOutcome] = useState(0);
  const [previousOutcome, setPreviousOutcome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [previousSavings, setPreviousSavings] = useState(0);

  const [month, setMonth] = useState(currentDate.getMonth());
  const [userData, setUserData] = useState({
    labels: exampleData.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: exampleData.map((data) => data.value),
      },
    ],
  });

  useEffect(() => {
    setOutcome(sumAllByMonth(expenses, month));
    setPreviousOutcome(sumAllByMonth(expenses, month - 1));
    setSavings(getSavedSum(expenses, month));
    setPreviousSavings(getSavedSum(expenses, month - 1));
  });

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
            <LineChartComponent chartData={userData} />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <CategoriesSummaryComponent />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <UtilitiesComponent />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <NoteComponent />
          </Col>
          <Col className="col-12 col-lg-6 p-4">
            <PieChartComponent chartData={userData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyzerPage;
