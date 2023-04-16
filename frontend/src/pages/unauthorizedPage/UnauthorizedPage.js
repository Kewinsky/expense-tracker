import { useNavigate } from "react-router-dom";

const UnauthorizedPage = (currentUser) => {
  const navigate = useNavigate();

  //TODO: why currentUser undefined
  if (!currentUser) {
    navigate("/login");
  }

  return (
    <div className="text-center mt-5">
      <h1>Error 401</h1>
      <div>
        You have no permitions to acces this content. Go to{" "}
        <a href="/" className="link-dark">
          home page
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
