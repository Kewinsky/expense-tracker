import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = ({ currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

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
