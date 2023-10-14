import { useContext } from "react";
import { ThemeContext } from "../../App";
import { Link } from "react-router-dom";
const UnauthorizedPage = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  return (
    <div className="text-center m-5">
      <h1>Error 401</h1>
      <div>
        You have no privileges to access this content. Go to{" "}
        <Link to={"/"} className={`link-${reversedTheme}`}>
          home page
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
