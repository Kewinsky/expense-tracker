import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";

const LoginComponent = () => {
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

    AuthService.login(username, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      () => {
        setMessage("Invalid credentials.");
      }
    );
  };

  return (
    <Form onSubmit={handleLogin} ref={form}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          required
          value={username}
          onChange={onChangeUsername}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangePassword}
        />
      </Form.Group>
      <div className="text-center mb-3">
        <span>
          No account? Go to{" "}
          <a href="/register" className="link-dark">
            register page
          </a>
        </span>
      </div>
      <div className="text-center">
        <Button variant="dark" type="submit">
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
  );
};

export default LoginComponent;
