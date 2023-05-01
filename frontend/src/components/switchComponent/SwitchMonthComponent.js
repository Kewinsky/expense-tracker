import "./switchMonthComponent.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export const SwitchMonthComponent = ({ months, month, setMonth }) => {
  const handleRightButton = () => {
    if (month < 11) {
      month = month + 1;
      setMonth(month);
    }
  };

  const handleLeftButton = () => {
    if (month > 0) {
      month = month - 1;
      setMonth(month);
    }
  };
  return (
    <div className="switch-container">
      <Link variant="outline-dark" onClick={handleLeftButton}>
        <BsFillArrowLeftCircleFill size={28} color="#212529" />
      </Link>
      <h5 className="month-title">{months[month]}</h5>
      <Link variant="outline-dark" onClick={handleRightButton}>
        <BsFillArrowRightCircleFill size={28} color="#212529" />
      </Link>
    </div>
  );
};
