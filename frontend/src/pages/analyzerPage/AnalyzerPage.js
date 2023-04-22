import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
const AnalyzerPage = ({ currentUser }) => {
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  return <div>Analyzer Page</div>;
};

export default AnalyzerPage;
