import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
  return (
    <Navbar className="nav_container" collapseOnSelect expand="lg">
      <Container className="nav_size" fluid>
        <Navbar.Brand href="/home" className="weto">
          Weto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/crew">CREW</Nav.Link>
            <Nav.Link href="/challenge">CHALLENGE</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/mypage">MY PAGE</Nav.Link>
            <Nav.Link href="#memes">LOGOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
