import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

const ProtectedRoute = ({ children }) => {
  if (AuthService.getCurrentUser() === undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
