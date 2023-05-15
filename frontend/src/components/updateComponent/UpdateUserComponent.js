import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import UserService from "../../services/userService";
import ThemeModeService from "../../services/themeModeService";

const UpdateUserComponent = ({ currentUser, setCurrentUser, theme }) => {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const buttonTheme = theme === "dark" ? "light" : "dark";
  const inputTheme =
    ThemeModeService.getCurrentThemeMode() === "dark" ? "darkTheme" : "";

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
          variant={`outline-${buttonTheme}`}
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
