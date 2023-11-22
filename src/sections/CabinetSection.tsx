import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useVocabulary from '../hoocks/useVocabulary';

export default function CabinetSection() {
  const { vocabulary } = useVocabulary();
  const stat = vocabulary.reduce(
    (acc, w) => {
      acc.total += 1;
      console.log('w.status', w.status);
      if (w.status === 'learned') {
        acc.learned += 1;
      } else {
        acc.progress += 1;
      }
      return acc;
    },
    {
      total: 0,
      learned: 0,
      progress: 0,
    },
  );
  return (
    <Row className="justify-content-center m-0">
      <Col xs={10} sm={8} md={6}>
        <h2 className="mt-4">Statistic</h2>
        <Row>
          <Col xs={7}>Words</Col>
          <Col xs={3}>{stat.total}</Col>
        </Row>
        <Row>
          <Col xs={7}>Learned</Col>
          <Col>{stat.learned}</Col>
        </Row>
        <Row>
          <Col xs={7}>In progress</Col>
          <Col>{stat.progress}</Col>
        </Row>
      </Col>
    </Row>
  );
}
