import RegisterComponent from "../../components/registerComponent/RegisterComponent";
const RegisterPage = ({ theme }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="m-5 w-50">
        <RegisterComponent theme={theme} />
      </div>
    </div>
  );
};

export default RegisterPage;
