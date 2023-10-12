import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import UserService from "../../services/userService";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";
import AuthService from "../../services/authService";

const UpdateUserComponent = () => {
  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const currentUser = AuthService.getCurrentUser();

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatedUser = {
    username,
    email,
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setIsPending(true);

    setTimeout(() => {
      UserService.updateCurrentUser(updatedUser)
        .then(() => {
          setMessage("User updated successfully");
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
      <Card.Header>Update Profile</Card.Header>
      <Form onSubmit={handleUpdateUser} className="m-5">
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInputUsername}
            value={username}
            type="text"
            className={`${theme}Theme`}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleInputEmail}
            value={email}
            type="email"
            className={`${theme}Theme`}
          />
        </Form.Group>
        <Form.Group className="mt-5">
          {isPending && <SpinnerComponent />}
          {!isPending && !message && (
            <>
              <Button variant="success" type="submit" className="w-100">
                Submit
              </Button>
              <Button
                variant={`outline-${reversedTheme}`}
                type="submit"
                className="w-100 mt-2"
                href="/profile"
              >
                Cancel
              </Button>
            </>
          )}
        </Form.Group>

        {message && (
          <Form.Group className="mt-5">
            <div className="alert alert-success m-0" role="alert">
              {message}
            </div>
            <div className="mt-5 text-center">
              <a href="/profile" className={`link-${reversedTheme} `}>
                Back
              </a>
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

export default UpdateUserComponent;
