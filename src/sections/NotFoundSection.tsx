import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFoundSection() {
    const navigate = useNavigate();

    const handleGoBack = () => navigate(-1);

    return (
        <Col className='d-flex flex-column align-items-center justify-content-center'>
            <h1>404</h1>
            <h2>Not Found</h2>
            <h2>{':-('}</h2>
            <Button onClick={handleGoBack} variant='outline-secondary'>back</Button>
        </Col>
    );
}