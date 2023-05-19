import { useContext } from "react";
import { ThemeContext } from "../../App";

const RecordComponent = ({ title, value }) => {
  const { theme } = useContext(ThemeContext);
  const borderColor = theme === "dark" ? "white" : "black";

  return (
    <div
      className="d-flex justify-content-between my-4"
      style={{ borderBottom: "1px solid " + borderColor }}
    >
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default RecordComponent;
