import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";

const LoginComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    AuthService.login(username, password)
      .then(() => {
        setIsPending(true);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Login</Card.Header>
      <Form onSubmit={handleLogin} ref={form} className="m-5">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            value={username}
            onChange={onChangeUsername}
            className={inputTheme}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={onChangePassword}
            className={inputTheme}
          />
        </Form.Group>
        <Form.Group className="row">
          <div className="mb-5 col-12 col-md-6">
            No account?{" "}
            <a href="/register" className={`link-${reversedTheme}`}>
              Sign up
            </a>
          </div>
          <div className="mb-5 col-12 col-md-6 text-md-end">
            <a href="/forgotPassword" className={`link-${reversedTheme} `}>
              Forgot password
            </a>
          </div>
        </Form.Group>
        <Form.Group className="text-center">
          {isPending && (
            <div>
              <SpinnerComponent />
            </div>
          )}
          {!isPending && (
            <Button variant={`outline-${reversedTheme}`} type="submit">
              Login
            </Button>
          )}
        </Form.Group>
        {error && (
          <Form.Group className="mt-5">
            <div className="alert alert-danger m-0" role="alert">
              {error}
            </div>
          </Form.Group>
        )}
      </Form>
    </Card>
  );
};

export default LoginComponent;
