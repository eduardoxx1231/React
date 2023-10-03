import React from 'react';
import { ListGroup, Row } from 'react-bootstrap';
import { IWord } from '../../../models/IWord';
import VocabularyItem from './VocabularyItem';

export default function VocabularyList({
  wordsList,
  onChangeActive,
}: {
  wordsList: IWord[];
  onChangeActive: (id: IWord['id'], active: boolean) => void;
}) {
  const buildList = wordsList.map((wordItem) => {
    return (
      <VocabularyItem
        key={wordItem.word}
        wordItem={wordItem}
        onChangeActive={onChangeActive}
      />
    );
  });
  return buildList.length ? (
    <ListGroup>{buildList}</ListGroup>
  ) : (
    <Row className="justify-content-center">no words</Row>
  );
}
