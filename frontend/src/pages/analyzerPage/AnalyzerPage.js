import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
const AnalyzerPage = () => {
  const navigate = useNavigate();

  // TODO: currentUser
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  return <div>Analyzer Page</div>;
};

export default AnalyzerPage;
