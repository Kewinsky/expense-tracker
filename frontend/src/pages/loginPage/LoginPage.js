import LoginComponent from "../../components/loginComponent/LoginComponent";
import "./loginPage.scss";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 set-width">
        <LoginComponent />
      </div>
    </div>
  );
};

export default LoginPage;
