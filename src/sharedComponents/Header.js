import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>MERN Stack</Navbar.Brand>
        <Nav>
          <NavLink className="nav-link" to="/">
            All Users
          </NavLink>
          <NavLink className="nav-link" to="/places">
            All Places
          </NavLink>
          <NavLink className="nav-link" to="/place/new">
            New Places
          </NavLink>
          <NavLink className="nav-link" to="/auth">
            Authentication
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
