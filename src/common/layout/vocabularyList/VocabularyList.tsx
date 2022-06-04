import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { IWord } from '../../../models/IWord';
import VocabularyItem from './VocabularyItem';

export default function VocabularyList({ wordsList, onChangeActive}: 
        {wordsList: IWord[]; onChangeActive: (id: number, active: boolean) => void} ) {
    const buildList = wordsList.map(( wordItem )=>{
        return <VocabularyItem key={wordItem.word} wordItem={wordItem} onChangeActive={onChangeActive}/>
    }); 
    return (
        <ListGroup>
            {buildList}
        </ListGroup>
    );
}