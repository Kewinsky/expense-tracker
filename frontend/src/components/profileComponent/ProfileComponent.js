import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import "./profileComponent.scss";
import { Card, Col, Image, Row } from "react-bootstrap";
import userImg from "../../assets/images/user_image.png";
import AuthService from "../../services/authService";
import { filterByYear } from "../../helpers/expenseFilter";
import IncomeService from "../../services/incomeService";
import { sumAllByYear } from "../../helpers/analyzerMethods";

const ProfileComponent = () => {
  const { theme, expenses } = useContext(ThemeContext);

  const currentYear = new Date().getFullYear();
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  const [totalIncomeByYear, setTotalIncomeByYear] = useState(0);

  const expensesOfYear = filterByYear(expenses, parseInt(currentYear));
  const totalOutcomeByYear = sumAllByYear(
    expensesOfYear,
    parseInt(currentYear)
  );

  const getIncomes = async () => {
    const response = await IncomeService.getIncomes();

    const incomesOfYear = filterByYear(response.data, parseInt(currentYear));
    setTotalIncomeByYear(sumAllByYear(incomesOfYear, parseInt(currentYear)));
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
            <Image src={userImg} height={80} />
          </div>
          <Row className="mb-5 ">
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
          <Row className="mb-5 ">
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
          <Row className="mb-5">
            <Col className="d-flex align-items-center">
              <h5 className="m-0">Categories</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={"/userCategories"}>
                <Button variant={`outline-${reversedTheme}`}>Edit</Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center">
              <h5 className="m-0">Incomes</h5>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to={"/userIncomes"}>
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
