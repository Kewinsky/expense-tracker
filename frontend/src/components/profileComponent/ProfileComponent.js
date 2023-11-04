import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import "./profileComponent.scss";
import { Card, Col, Row } from "react-bootstrap";
import AuthService from "../../services/authService";
import { filterByYearAndMonth } from "../../helpers/filteringMethods";
import IncomeService from "../../services/incomeService";
import { sumAllByYear } from "../../helpers/summingMethods";
import { BsPersonCircle } from "react-icons/bs";

const ProfileComponent = () => {
  const { theme, expenses } = useContext(ThemeContext);

  const currentYear = new Date().getFullYear();
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  const [totalIncomeByYear, setTotalIncomeByYear] = useState(0);

  const expensesOfYear = filterByYearAndMonth(expenses, currentYear, null);
  const totalOutcomeByYear = sumAllByYear(expensesOfYear, currentYear);

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    const incomesOfYear = filterByYearAndMonth(
      response.data,
      currentYear,
      null
    );
    setTotalIncomeByYear(sumAllByYear(incomesOfYear, currentYear));
  };

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="d-flex justify-content-center m-3">
      <Card className={`bg-${theme} card-width`}>
        <Card.Header>Your Profile</Card.Header>
        <Card.Body className="m-4">
          <div className="mb-5 text-center">
            <BsPersonCircle size={80} />
          </div>
          <Row className="mb-5">
            <Col className="d-flex align-items-center">
              <div>
                <h5 className="m-0">Saved money</h5>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <div>
                <h5 className="m-0">
                  {totalIncomeByYear - totalOutcomeByYear > 0
                    ? totalIncomeByYear - totalOutcomeByYear
                    : 0}
                </h5>
              </div>
            </Col>
          </Row>
          <Row className="">
            <Col className="d-flex align-items-center">
              <div>
                <h5 className="m-0">Credentials</h5>
              </div>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={`/update/user/${currentUser.id}`}>
                <Button variant={`outline-${reversedTheme}`}>Edit</Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileComponent;
