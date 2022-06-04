import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { IDictionaryWord } from '../../../models/IDictionaryWord';

export default function DictionaryList({ dicList, onClick }: 
		{ 
			dicList: IDictionaryWord[]; 
			onClick: (id:number) => void;
		}) {
    const buildList = dicList.map(( dicItem )=>{
        return (
			<ListGroup.Item 
				key={dicItem.word} 
				action 
				className='word-item'
				data-dictionary-id={dicItem.id}
				onClick={() => onClick(dicItem.id)}
			>
            	<Row className='align-items-center'>
					<Col xs={6} className='fs-5'>
						{dicItem.word}
					</Col>
					<Col xs={6}>
						{dicItem.translations[0]}
					</Col>
				</Row>
			</ListGroup.Item>
		)
    });
    return (
        <ListGroup>
            {buildList}
        </ListGroup>
    );
}