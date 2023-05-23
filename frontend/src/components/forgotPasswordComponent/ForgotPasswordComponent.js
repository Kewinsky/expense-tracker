import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ForgotPasswordComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const form = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const newPassword = {
    email,
    password,
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    setMessage("");

    AuthService.forgotPassword(newPassword)
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Login</Card.Header>
      <Form onSubmit={handleUpdatePassword} ref={form} className="m-5">
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
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
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={onChangePassword}
            className={inputTheme}
          />
        </Form.Group>
        <div className="text-center">
          <Button variant={`outline-${reversedTheme}`} type="submit">
            Update password
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

export default ForgotPasswordComponent;
