import { useContext } from "react";
import { ThemeContext } from "../../App";
const UnauthorizedPage = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  return (
    <div className="text-center mt-5">
      <h1>Error 401</h1>
      <div>
        You have no privileges to access this content. Go to{" "}
        <a href="/" className={`link-${reversedTheme}`}>
          home page
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
