import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col, Button } from 'react-bootstrap';

import AppRoutes from './app.routes';
import { AuthService } from '../components/Auth/auth.service';
import HomeRoute from './home.route';


const authService = new AuthService();

export default function Shell() {
  const [expanded, setExpanded] = useState(false);
  const isAuthenticated: boolean = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login'
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }} id='container'>
      <div style={{ paddingBottom: "2.5rem" }}>
        <Navbar variant="dark" expand="lg" className='bg-primary py-3 mb-4'  >
          <Container>
            <Navbar.Brand className='h1'>BILLARIS</Navbar.Brand>
            <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
            <Navbar.Collapse id="navbarCollapse" in={expanded}>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>

                <NavDropdown title="About" id="basic-nav-dropdown">
                  <NavDropdown.Item href='/contact'>Contact</NavDropdown.Item>
                  <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/galllery'>Gallery</NavDropdown.Item>
                </NavDropdown>
                {isAuthenticated ? (
                  <Nav>
                    <Button variant='outline-light' onClick={handleLogout}>Logout</Button>
                  </Nav>
                ) : (
                  <Nav >
                    <Button variant="outline-light" href="/login">
                      Login
                    </Button>
                    <Button variant="outline-light mt-2 ms-2" href="/register">
                      SignUp
                    </Button>
                  </Nav>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container >
          <Row>
            {/* <Col lg={2} className="bg-light">
            <h3>Sidebar</h3>
          </Col> */}
            <Col className="p-4">
              <AppRoutes />
            </Col>
          </Row>
        </Container>
      </div>
      <footer style={{ position: "absolute", bottom: 0, width: "100%", height: "" }} className="bg-dark text-white text-center p-3">
        <p>&copy; {new Date().getFullYear()} Aristoty Entreprise. All rights reserved.</p>
      </footer>
    </div>

  );
}
