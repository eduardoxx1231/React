import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LettersListItem from './LettersListItem';

const LettersList = (
    { list, clickedIndex, currentRightLetter, onClick }: { 
        list: string[]; 
        clickedIndex: number;
        currentRightLetter: string;
        onClick: (event: React.MouseEvent<HTMLElement>) => void 
    }) => {
    const idList = list.join('');
    const buldList = list.map((item, index)=>
        <LettersListItem 
            key={idList+index}
            index={index}
            letter={item}
            isMistake={
                index === clickedIndex &&
                item !== currentRightLetter} 
            isRight={item === currentRightLetter}
        />
    );

    return (
            <Row className='justify-content-center'>
                <Col 
                    className='col-10 d-flex flex-wrap justify-content-center'
                    onClick={onClick}
                >
                    {buldList}
                </Col>
            </Row>
    );
}

export default LettersList;
