import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { IWord } from '../../../models/IWord';

const EndCard = ({
  statistic,
  pazzleWords,
}: {
  statistic: Record<string, boolean>;
  pazzleWords: IWord[];
}) => {
  const navigate = useNavigate();
  return (
    <Row className="justify-content-center m-0 p-0 quiz-card-outside">
      <div className="p-0 quiz-card-container">
        <Card className="p-3 quiz-card">
          <Card.Header>
            <Row>
              <Col>Finish Quizes</Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Title className="p-2 text-light d-flex justify-content-center">
              Results
            </Card.Title>
            <ul className="h5">
              {pazzleWords.map((item, index) => (
                <li
                  key={index}
                  className={statistic[item.id] ? 'word-success' : 'word-fail'}
                >
                  {item.word}
                </li>
              ))}
            </ul>
            <Button
              className="mt-4"
              variant="primary"
              onClick={() => navigate('/')}
            >
              Again
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
};

export default EndCard;
