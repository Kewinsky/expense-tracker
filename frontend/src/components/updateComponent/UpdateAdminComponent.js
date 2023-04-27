import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/userService";
const UpdateAdminComponent = ({ users, setUsers }) => {
  const { id } = useParams();
  const userId = id;

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

  const reloadData = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await UserService.updateUserByAdmin(userId, updatedUser)
      .then(() => reloadData())
      .then((window.location = "/usermanagement"))
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    const roles = selectedUser.roles.map((role) => role.name);
    if (roles.includes("ROLE_MODERATOR")) {
      setIsModerator(true);
    }
  }, [selectedUser.roles]);

  return (
    <Form onSubmit={handleUpdateUser}>
      <Form.Group className="mt-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputUsername}
          value={username}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleInputEmail}
          value={email}
          type="text"
          placeholder="Multisport subscription"
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
          variant="outline-dark"
          type="submit"
          className="w-100"
          href="/usermanagement"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateAdminComponent;
