import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NavDropdown, Nav } from 'react-bootstrap';

import useAuth from '../../hoocks/useAuth';

export default function AuthWidget({ onSelect }: { onSelect: () => void }) {
  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth.isAuth) {
    return (
      <Nav.Link as={Link} to="/login" onClick={onSelect}>
        Login
      </Nav.Link>
    );
  }

  const handleLogout = () => {
    onSelect();
    auth.logout(() => navigate('/'));
  };

  return (
    <NavDropdown
      title="User"
      id="basic-nav-dropdown"
      menuVariant="dark"
      align="end"
    >
      <NavDropdown.Item as={Link} to="/cabinet" onClick={onSelect}>
        Cabinet
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/settings" onClick={onSelect}>
        Settings
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
}
