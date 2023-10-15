import { useContext } from "react";
import { ThemeContext } from "../../App";

const RecordComponent = ({ title, type, value1, value2, value3 }) => {
  const { theme } = useContext(ThemeContext);
  const borderColor = theme === "dark" ? "white" : "black";

  let textColor = borderColor;

  if (value3 > 20) {
    textColor = "text-danger";
  } else if (value3 < -20) {
    textColor = "text-success";
  } else {
  }

  return (
    <tr className={`${borderColor}-row-color`}>
      <td>{title}</td>
      <td>{value1}</td>
      <td>{value2}</td>
      {type ? <td className={textColor}>{value3}%</td> : <td>{value3}%</td>}
    </tr>
  );
};

export default RecordComponent;
