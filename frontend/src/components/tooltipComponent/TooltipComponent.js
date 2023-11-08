import { useContext } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ThemeContext } from "../../App";
import { Link } from "react-router-dom";

const TooltipComponent = ({ children, placement, message }) => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{message}</Tooltip>}
    >
      <Link className={`link-${reversedTheme} text-decoration-none`}>
        {children}
      </Link>
    </OverlayTrigger>
  );
};

export default TooltipComponent;
