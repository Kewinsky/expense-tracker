import "./simplePage.scss";

const SimplePage = ({ children }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 set-card-width">{children}</div>
    </div>
  );
};

export default SimplePage;
