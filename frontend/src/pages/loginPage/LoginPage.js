import LoginComponent from "../../components/loginComponent/LoginComponent";

const LoginPage = ({ theme }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <LoginComponent theme={theme} />
      </div>
    </div>
  );
};

export default LoginPage;
