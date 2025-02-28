import { useContext } from "react";
import { Container, Navbar, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/auth-context";

const Header = () => {
  const auth = useContext(AuthContext);
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
            {auth.isLoggedIn && (
              <NavLink className="nav-link" to={`/user/${auth.userId}`}>
                My Place
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <NavLink className="nav-link" to="/place/new">
                New Places
              </NavLink>
            )}
            {auth.isLoggedIn && (
              <NavItem className="nav-link" onClick={() => auth.logout()}>
                Logout
              </NavItem>
            )}
            {!auth.isLoggedIn && (
              <NavLink className="nav-link" to="/authenticate">
                Authentication
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
