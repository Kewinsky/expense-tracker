import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginComponent = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <div className="text-center mb-3">
        <span>
          No account? Go to{" "}
          <a href="/register" className="link-dark">
            register page
          </a>
        </span>
      </div>
      <div className="text-center">
        <Button variant="dark" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginComponent;
