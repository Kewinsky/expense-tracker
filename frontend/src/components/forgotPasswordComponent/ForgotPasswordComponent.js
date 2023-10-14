import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import AuthService from "../../services/authService";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import { Link } from "react-router-dom";

const ForgotPasswordComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";

  const form = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

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

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      AuthService.forgotPassword(newPassword)
        .then(() => {
          setMessage("Password updated successfully");
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsPending(false);
        });
    }, 1000);
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
            className={`${theme}Theme`}
            disabled={message}
          />
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>New password</Form.Label>
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
              Reset password
            </Button>
          )}
        </Form.Group>
        {message && (
          <Form.Group className="mt-5">
            <div className="alert alert-success m-0" role="alert">
              {message}
            </div>
            <div className="mt-5 text-center">
              <Link to={"/login"} className={`link-${reversedTheme} `}>
                Back
              </Link>
            </div>
          </Form.Group>
        )}
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

export default ForgotPasswordComponent;
