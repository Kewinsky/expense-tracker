import { useState } from "react";
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

const AnalyzerPage = ({ months }) => {
  const currentDate = new Date();
  const [month, setMonth] = useState(0);

  const [userData, setUserData] = useState({
    labels: exampleData.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: exampleData.map((data) => data.value),
      },
    ],
  });

  return (
    <>
      <SwitchMonthComponent
        month={month}
        setMonth={setMonth}
        months={months}
        currentDate={currentDate}
      />
      <SummaryComponent />
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
