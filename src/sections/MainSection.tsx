import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';

export default function MainSection() {
  const navigate = useNavigate();
  const handleStart = () => navigate('/scud');
  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <h1>WordStorm</h1>
      <p className="mb-3">
        Application for learnig foreign words by quizes Translation, Listeting
        and Spell
      </p>
      <Button onClick={handleStart}>start</Button>
    </Col>
  );
}
