import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthWidget from './Auth/AuthWidget';
import { Context, StoreContextType } from '../context/Context';
import Spinner from '../common/Spinner';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout() {
  const { isLoading } = useContext<StoreContextType>(Context);
  const [expanded, setExpanded] = useState(false); // initially closed

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="logo.svg"
              height="30"
              className="d-inline-block align-top mx-1"
            />{' '}
            WordStorm
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleMenu}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
            // isOpen={menuOpen}
          >
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/" onClick={closeMenu}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="scud" onClick={closeMenu}>
                Scud
              </Nav.Link>
              <Nav.Link as={Link} to="vocabulary" onClick={closeMenu}>
                Vocabulary
              </Nav.Link>
              <AuthWidget onSelect={closeMenu} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="text-white-50 d-flex flex-column flex-grow-1 p-0">
        {isLoading ? <Spinner /> : <Outlet />}
      </Container>
    </>
  );
}
