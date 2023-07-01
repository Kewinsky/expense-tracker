import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserService from "../../services/userService";
import { ThemeContext } from "../../App";
import { Card } from "react-bootstrap";
import { reloadData } from "../../helpers/reloadData";

const UpdateAdminComponent = ({ users, setUsers }) => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

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
    await UserService.updateUserByAdmin(userId, updatedUser)
      .then(() => reloadData(UserService.getUsers, setUsers))
      .then(navigate("/usermanagement"))
      .catch((err) => console.log(err.response.data));
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
          <Button variant="success" type="submit" className="w-100">
            Submit
          </Button>
        </Form.Group>
        <Form.Group className="mt-2">
          <Button
            variant={`outline-${reversedTheme}`}
            type="submit"
            className="w-100"
            href="/usermanagement"
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default UpdateAdminComponent;
