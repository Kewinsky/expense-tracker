import { useNavigate } from "react-router-dom";
const AnalyzerPage = ({ currentUser }) => {
  const navigate = useNavigate();

  // TODO: navigate does not work
  if (!currentUser) {
    navigate("/login");
  }

  return <div>Analyzer Page</div>;
};

export default AnalyzerPage;
