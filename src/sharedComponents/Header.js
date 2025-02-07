import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>MERN Stack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">
              All Users
            </NavLink>
            <NavLink className="nav-link" to="/u1/place">
              My Place
            </NavLink>
            <NavLink className="nav-link" to="/place/new">
              New Places
            </NavLink>
            <NavLink className="nav-link" to="/authenticate">
              Authentication
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
