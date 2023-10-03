import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { IDictionaryWord } from '../../../models/IDictionaryWord';

export default function DictionaryList({
  dicList,
  onClick,
}: {
  dicList: IDictionaryWord[];
  onClick: (id: IDictionaryWord['id']) => void;
}) {
  const buildList = dicList.map((dicItem) => {
    return (
      <ListGroup.Item
        key={dicItem.word}
        action
        className="word-item"
        data-dictionary-id={dicItem.id}
        onClick={() => onClick(dicItem.id)}
      >
        <Row className="align-items-center">
          <Col xs={6} className="fs-5">
            {dicItem.word}
          </Col>
          {/* TODO Rework to Unfold all translations */}
          <Col xs={6}>{dicItem.translations[0]}</Col>
        </Row>
      </ListGroup.Item>
    );
  });
  return buildList.length ? (
    <ListGroup>{buildList}</ListGroup>
  ) : (
    <Row className="justify-content-center">no words</Row>
  );
}
