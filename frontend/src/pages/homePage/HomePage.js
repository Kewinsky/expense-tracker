import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="pt-3">
      <h1>Welcome to Spendee</h1>
      <h4>
        don't hesitate to add new expense{" "}
        <Link to={"/tracker"} className="link-success">
          <BsArrowRightCircleFill />
        </Link>
      </h4>
    </div>
  );
};

export default HomePage;
