import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to="/">
            <strong>Employee Management</strong>
          </Navbar.Brand>
          <Nav className="nav-link">
            <Nav.Link as={Link} to="/" className="nav-link">
              Employee
            </Nav.Link>
            <Nav.Link as={Link} to="/employee" className="nav-link">
            Post  Employee
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
