import Button from "react-bootstrap/Button";
import React, { useState, useRef, useContext } from "react";
import AuthService from "../../services/authService";
import { Form, Card, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

const RegisterComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const form = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

    AuthService.register(username, email, password).then(
      () => {
        AuthService.login(username, password).then(() => {
          navigate("/");
          window.location.reload();
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Register new account</Card.Header>
      <Form onSubmit={handleRegister} ref={form} className="m-5">
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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={onChangeEmail}
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
        <Form.Group className="text-center">
          <Button variant={`outline-${reversedTheme}`} type="submit">
            Sign Up
          </Button>
        </Form.Group>

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

export default RegisterComponent;
