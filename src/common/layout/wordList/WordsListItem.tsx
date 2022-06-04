import React from 'react';
import { Button } from 'react-bootstrap';

const WordsListItem = ({ text, isRight, checked }: 
        { 
            text: string; 
            isRight:boolean; 
            checked: boolean;
        }) => {

    const variant = !checked ? 'outline-secondary' 
        : isRight ? 'success' : 'danger';
    return (
        <Button variant={variant} data-value={text} className='text-light'>{text}</Button>
    );
}

export default WordsListItem;
