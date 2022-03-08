import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </Link>

          <Nav className="">
            <Link to="/favorites">
              <Nav.Link href="#home">My Posts</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
