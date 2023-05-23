import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";

const LoginComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    setMessage("");

    AuthService.login(username, password)
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
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
        <div className="row d-flex justify-content-between mb-3 text-center">
          <p className="col-12 col-md-6">
            No account?{" "}
            <a href="/register" className={`link-${reversedTheme}`}>
              Sign up
            </a>
          </p>
          <p className="col-12 col-md-6">
            <a href="/forgotPassword" className={`link-${reversedTheme}`}>
              Forgot password
            </a>
          </p>
        </div>
        <div className="text-center">
          <Button variant={`outline-${reversedTheme}`} type="submit">
            Login
          </Button>
        </div>
        {message && (
          <Form.Group className="mt-3">
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          </Form.Group>
        )}
      </Form>
    </Card>
  );
};

export default LoginComponent;
