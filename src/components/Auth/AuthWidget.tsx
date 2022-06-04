import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavDropdown, Nav } from 'react-bootstrap';

import useAuth from '../../hoocks/useAuth';

export default function AuthWidget() {
    const auth = useAuth();
    const navigate = useNavigate();
    if (!auth.isAuth) {
        return (
          <Nav.Link as={Link} to='/login' >Login</Nav.Link>
        );
    }

    const handleLogout =() => {
      auth.logout(() => navigate('/'));
    }
    
    return (
      <NavDropdown title='User' id='basic-nav-dropdown' menuVariant='dark' align='end'>
        <NavDropdown.Item as={Link} to='/cabinet'>
          Cabinet
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to='/settings'>
          Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
}