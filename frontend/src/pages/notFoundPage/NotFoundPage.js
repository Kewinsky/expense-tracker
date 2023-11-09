import ErrorPage from "../errorPage/ErrorPage";

const NotFoundPage = () => {
  return <ErrorPage errorCode={"404"} message={"Not found."} />;
};

export default NotFoundPage;
