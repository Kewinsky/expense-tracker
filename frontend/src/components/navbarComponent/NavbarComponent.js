import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthService from "../../services/authService";

const NavbarComponent = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      const roles = user.roles;

      if (roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            {currentUser && (
              <>
                <Nav.Link href="/tracker">Tracker</Nav.Link>
                <Nav.Link href="/analyzer">Analyzer</Nav.Link>
              </>
            )}
            {isAdmin && (
              <>
                <Nav.Link href="/usermanagement">User Management</Nav.Link>
              </>
            )}
            {currentUser && (
              <Nav.Link href="/profile">
                {currentUser.username}'s Board
              </Nav.Link>
            )}
          </Nav>
          {currentUser ? (
            <Button
              href="/login"
              variant="outline-danger"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button href="/login" variant="outline-success">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
