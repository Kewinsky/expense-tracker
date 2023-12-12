import SimplePage from "../simplePage/SimplePage";
import Button from "react-bootstrap/Button";
import { useState, useRef, useContext } from "react";
import AuthService from "../../services/authService";
import { Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import SpinnerComponent from "../../components/spinnerComponent/SpinnerComponent";
import { formatPasswordMessage } from "../../helpers/formatPasswordMessage";

const RegisterPage = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const form = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      AuthService.register(username, email, password)
        .then(() => {
          setMessage("New user registered successfully");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(() => {
      navigate("/expenses");
      window.location.reload();
    });
  };

  return (
    <SimplePage>
      <Card className={`bg-${theme}`}>
        <Card.Header>Register</Card.Header>
        <Form onSubmit={handleRegister} ref={form} className="m-5">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              required
              minLength={6}
              value={username}
              onChange={onChangeUsername}
              className={`${theme}Theme`}
              disabled={message}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={onChangeEmail}
              className={`${theme}Theme`}
              disabled={message}
            />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={onChangePassword}
              className={`${theme}Theme`}
              disabled={message}
            />
          </Form.Group>
          <Form.Group className="text-center">
            {isPending && <SpinnerComponent />}
            {!isPending && !message && (
              <Button variant={`outline-${reversedTheme}`} type="submit">
                Sign Up
              </Button>
            )}
          </Form.Group>
          {message && (
            <Form.Group className="mt-5">
              <div className="alert alert-success m-0" role="alert">
                {message}
              </div>
              <div className="mt-5 text-center">
                <Button
                  variant={`outline-${reversedTheme}`}
                  onClick={handleLogin}
                >
                  Start tracking!
                </Button>
              </div>
            </Form.Group>
          )}
          {error && (
            <Form.Group className="mt-5">
              <div className="form-group">
                <div className="alert alert-danger m-0" role="alert">
                  {formatPasswordMessage(error)}
                </div>
              </div>
            </Form.Group>
          )}
        </Form>
      </Card>
    </SimplePage>
  );
};

export default RegisterPage;
