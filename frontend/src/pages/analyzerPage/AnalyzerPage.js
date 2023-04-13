import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseService from "../../services/expenseService";
const AnalyzerPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    ExpenseService.getExpenses().then(
      (response) => {
        setContent(response.data);
      },
      () => {
        navigate("/login");
      }
    );
  }, []);
  return <div>Analyzer Page</div>;
};

export default AnalyzerPage;
