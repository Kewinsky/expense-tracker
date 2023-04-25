const UnauthorizedPage = ({ currentUser }) => {
  return (
    <div className="text-center mt-5">
      <h1>Error 401</h1>
      <div>
        You have no privileges to access this content. Go to{" "}
        <a href="/" className="link-dark">
          home page
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
