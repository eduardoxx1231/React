import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthWidget from './Auth/AuthWidget';
import { Context, StoreContextType } from '../context/Context';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Layout() {
    const { isLoading } = useContext<StoreContextType>(Context);
    return (
      <>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand href='/'>
              <img
              alt=''
              src='logo.svg'
              height='30'
              className='d-inline-block align-top mx-1'
              />{' '}
              WordStorm
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse  id='basic-navbar-nav' className='justify-content-end'>
              <Nav className='justify-content-end'>
                <Nav.Link as={Link} to='/' >Home</Nav.Link>
                <Nav.Link as={Link} to='scud' >Scud</Nav.Link>
                <Nav.Link as={Link} to='vocabulary' >Vocabulary</Nav.Link>
                <Nav.Link disabled>|</Nav.Link>
                <AuthWidget />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <Container  className='text-white-50 flex-grow-1 d-flex flex-column'>
            {isLoading && 'LOADING'}
            <Outlet />
          </Container>
      </>
    );
  }