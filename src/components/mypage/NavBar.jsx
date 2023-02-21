import './NavBar.css';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const navigate = useNavigate();
  // const {loginState, setLoginState} = useState(nav_login);
  // const {loginHref, setLoginHref} = useState('/login');
  // const nav_login = 'login';
  // console.log(loginState);

  const logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('pw');
    console.log(sessionStorage);
    navigate('/');
  };
  return (
    <Navbar className="nav_container" collapseOnSelect expand="lg">
      <Container className="nav_size" fluid>
        <Navbar.Brand as={Link} to="/" className="weto">
          Weto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/crew">
              CREW
            </Nav.Link>
            <Nav.Link as={Link} to="/challenge">
              CHALLENGE
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/mypage">
              MY PAGE
            </Nav.Link>
            {sessionStorage.length == 0 ? (
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => logout()}>LOGOUT</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
