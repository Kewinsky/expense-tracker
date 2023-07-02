import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserService from "../../services/userService";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../spinnerComponent/SpinnerComponent";

const UpdateAdminComponent = ({ users }) => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);

  const userId = id;
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

  const selectedUser = users.find((item) => {
    return item.id === parseInt(userId);
  });

  const [username, setUsername] = useState(selectedUser.username);
  const [email, setEmail] = useState(selectedUser.email);
  const [isModerator, setIsModerator] = useState(false);
  const [roles, setRoles] = useState(
    selectedUser.roles.map((role) => role.name)
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleToggleSwitch = (e) => {
    setIsModerator(e.target.checked);
    if (roles.includes("ROLE_MODERATOR")) {
      roles.splice(roles.indexOf("ROLE_MODERATOR"), 1);
    } else {
      roles.push("ROLE_MODERATOR");
    }
    setRoles(roles);
  };

  const updatedUser = {
    username,
    email,
    role: roles,
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await UserService.updateUserByAdmin(userId, updatedUser);
      setIsPending(true);

      setTimeout(() => {
        setIsPending(false);
        setMessage(response);
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const roles = selectedUser.roles.map((role) => role.name);
    if (roles.includes("ROLE_MODERATOR")) {
      setIsModerator(true);
    }
  }, [selectedUser.roles]);

  return (
    <Card className={`bg-${theme}`}>
      <Card.Header>Update User</Card.Header>
      <Form onSubmit={handleUpdateUser} className="mt-1 mb-5 mx-5">
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInputUsername}
            value={username}
            type="text"
            className={inputTheme}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleInputEmail}
            value={email}
            type="text"
            placeholder="Multisport subscription"
            className={inputTheme}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Moderator"
            onChange={handleToggleSwitch}
            checked={isModerator}
          />
        </Form.Group>

        <Form.Group className="mt-3">
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
                href="/usermanagement"
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
              <a href="/usermanagement" className={`link-${reversedTheme} `}>
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

export default UpdateAdminComponent;
