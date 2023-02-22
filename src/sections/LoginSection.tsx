import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Stack, Col, Row, Container } from 'react-bootstrap';
import useAuth from '../hoocks/useAuth';

interface LocationState {
  from?: { pathname: string };
}

export default function LoginSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const locationState = location.state as LocationState;
  const fromPath = locationState?.from?.pathname || '/';

  const loginForm = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowValidation, setAllowValidation] = useState(false);

  const handleAuth = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const isValid = loginForm.current.checkValidity() ?? false;
    setAllowValidation(true);
    if (!isValid) return;

    if (event.target.name === 'login') {
      auth.login(email, password, () => navigate(fromPath, { replace: true }));
    }
    if (event.target.name === 'register') {
      auth.registration(email, password, () =>
        navigate(fromPath, { replace: true }),
      );
    }
  };

  return (
    <Container className="bg-transparent">
      <Row className="text-white-50 justify-content-md-center mt-3">
        {fromPath !== '/' && 'You must log in to view this page'} &nbsp;
      </Row>
      <Form noValidate validated={allowValidation} ref={loginForm}>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-white-50">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Incorrect Email.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Correct</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-white-50">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={14}
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              Required
            </Form.Control.Feedback>
            <Form.Control.Feedback>Correct</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="text-white-50"
            />
          </Form.Group>
          <Row>
            <Col className="d-grid">
              <Button
                type="submit"
                name="login"
                variant="primary"
                onClick={handleAuth}
              >
                Login
              </Button>
            </Col>
            <Col className="d-grid">
              <Button
                type="submit"
                name="register"
                variant="outline-primary"
                onClick={handleAuth}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Stack>
      </Form>
    </Container>
  );
}
