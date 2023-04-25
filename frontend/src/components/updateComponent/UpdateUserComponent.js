import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import UserService from "../../services/userService";
import MultiselectComponent from "../multiselectComponent/MultiselectComponent";
const UpdateUserComponent = ({ reloadData, users }) => {
  const { id } = useParams();
  const userId = id;

  console.log(users);

  const selectedUser = users.find((item) => {
    return item.id === parseInt(userId);
  });

  const [username, setUsername] = useState(selectedUser.username);
  const [email, setEmail] = useState(selectedUser.email);
  const [roles, setRoles] = useState(selectedUser.roles);

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputRoles = (e) => {
    setRoles(e.target.value);
  };

  const updatedUser = {
    username,
    email,
    roles,
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await UserService.updateUser(userId, updatedUser)
      .then(() => reloadData())
      .then((window.location = "/usermanagement"));
  };

  return (
    <Form onSubmit={handleUpdateUser}>
      <Form.Group className="mt-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={handleInputUsername}
          value={username}
          type="date"
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
        <Form.Label>Roles</Form.Label>
        <MultiselectComponent onChange={handleInputRoles} value={roles} />
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
          href="/tracker"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateUserComponent;
