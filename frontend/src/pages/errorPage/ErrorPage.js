import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
const ErrorPage = ({ errorCode, message }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="text-center pt-5">
      <h1>Error {errorCode}</h1>
      <div>
        {message} Go to{" "}
        <Link to={"/"} className={`link-${reversedTheme}`}>
          home page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
