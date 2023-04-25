const ErrorPage = () => {
  return (
    <div className="text-center mt-5">
      <h1>Error 404</h1>
      <div>
        Not found. Go to{" "}
        <a href="/" className="link-dark">
          home page
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
