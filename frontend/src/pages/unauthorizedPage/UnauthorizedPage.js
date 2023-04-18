import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "../../services/authService";

const UnauthorizedPage = (currentUser) => {
  const navigate = useNavigate();

  //TODO: why currentUser undefined
  // if (!currentUser) {
  //   navigate("/login");
  // }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="text-center mt-5">
      <h1>Error 401</h1>
      <div>
        You have no privileges to access this content. Go to{" "}
        <a href="/" className="link-dark">
          home page
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
