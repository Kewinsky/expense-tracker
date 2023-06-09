import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
  return (
    <div className="text-center m-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
