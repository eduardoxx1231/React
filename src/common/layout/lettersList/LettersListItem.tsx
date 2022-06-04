import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const LettersListItem = ({ index, letter, isMistake, isRight }: 
        { index: number, letter: string, isMistake: boolean; isRight: boolean }) => {
    const letterClasses = ['text-light', 'm-2', 'col-2'];
    const [isShow, setIsShow] = useState(true);
    // const [isMistake, setIsMistake] = useState(false);
    
    letterClasses.push(isShow ? 'visible' : 'invisible');
    letterClasses.push(isMistake ? 'border border-danger' : '');
    const handleClick = () => {
        if (isRight) {
            setIsShow(false);
            return;
        }
        // setIsMistake(true);
    }
    // console.log(isMistake);
    return (
        <Button 
            className={letterClasses.join(' ')}
            variant={'outline-secondary'}
            data-index={index} 
            onClick={handleClick}
        >
            {letter}
        </Button>
    );
}

export default LettersListItem;
