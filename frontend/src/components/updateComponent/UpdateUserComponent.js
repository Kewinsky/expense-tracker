import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import UserService from "../../services/userService";
import { ThemeContext } from "../../App";

const UpdateUserComponent = ({ currentUser, setCurrentUser }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const { theme } = useContext(ThemeContext);
  const reversedTheme = theme === "dark" ? "light" : "dark";
  const inputTheme = theme === "dark" ? "darkTheme" : "";

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
    await UserService.updateCurrentUser(currentUser.id, updatedUser)
      .then((window.location = "/profile"))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Form onSubmit={handleUpdateUser}>
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
          type="email"
          className={inputTheme}
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
          href="/profile"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateUserComponent;
