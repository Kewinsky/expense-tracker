import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" />
      </Form.Group>
      <div className="text-center">
        <Button variant="dark" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default RegisterComponent;
