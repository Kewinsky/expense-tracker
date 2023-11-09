import ErrorPage from "../errorPage/ErrorPage";

const UnauthorizedPage = () => {
  return (
    <ErrorPage
      errorCode={"401"}
      message={"You have no privileges to access this content."}
    />
  );
};

export default UnauthorizedPage;
