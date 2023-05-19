import ThemeModeService from "../../services/themeModeService";

const RecordComponent = ({ title, value }) => {
  const storedTheme = ThemeModeService.getCurrentThemeMode();
  const borderColor = storedTheme === "dark" ? "white" : "black";

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
