import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import QuizCard from '../../common/layout/quizCard/QuizCard';

import { IQuizProps } from '../../models/IQuiz';
import { shuffle } from '../../utils/shuffle';
import LettersList from '../../common/layout/lettersList/LettersList';

import { skipedChars } from '../../constants';

export default function QuizSpell({pazzleWord, next}: IQuizProps): JSX.Element {
    const [pazzleList, setPazzleList] = useState<string[]>([]);
    const [allowNext, setAllowNext] = useState<boolean>(false);
    const [isAnswerRight, setIsAnswerRight] = useState<boolean>(true);

    const [currentRihgtLetterIndex, setCurrentRightLetterIndex] = useState(0);
    const [clickedIndex, setClickedIndex] = useState<number>();
    const currentWordLetters = pazzleWord.word.split('');    
   	const currentRightLetter = currentWordLetters[currentRihgtLetterIndex];

    useEffect(() => {
        const resultList = currentWordLetters
			.filter((char) => !skipedChars.includes(char));
        setPazzleList(shuffle(resultList));
    }, [pazzleWord.word]);

    useEffect(() => {
        if (currentRihgtLetterIndex >= currentWordLetters.length) {
            setAllowNext(true);
        }        
    }, [currentRihgtLetterIndex]);

    const getNextRihgtLetterIndex = ():number => {
        let index = currentRihgtLetterIndex +1
        while (skipedChars.includes(currentWordLetters[index])
            && index < currentWordLetters.length) {
            index++;
        }
        return index;
    }

    const hadleClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        const choosenLetterIndex = Number(target.dataset.index);
        
        if (isNaN(choosenLetterIndex)) return
        
        setClickedIndex(choosenLetterIndex);
        // console.log('let', pazzleList[choosenLetterIndex]);
        // console.log('chek', pazzleList[choosenLetterIndex] === currentRightLetter);
        const isLetterCorrect = pazzleList[choosenLetterIndex] === currentRightLetter
        if (isLetterCorrect) {
            setCurrentRightLetterIndex(getNextRihgtLetterIndex());
        }
        if (isAnswerRight) {
            setIsAnswerRight(isLetterCorrect);
        }
    };

    const handleNextWord = () => {
        // setCurrentRightLetterIndex(0);
        // setClickedIndex(undefined);
        // setPazzleList([]);
        // setAllowNext(false);
		next(isAnswerRight);
    }

    const dislpayResult = currentWordLetters
        .slice(0, currentRihgtLetterIndex).join('');

    return (
        <QuizCard
            title='Translate to English'
            pazzle={pazzleWord.translation} 
            disabledNext={!allowNext} 
            handleNextWord={handleNextWord}
        >
            <Card.Title className='p-2 text-primary d-flex justify-content-center height40'>
                {dislpayResult}
            </Card.Title>
            <LettersList 
                onClick={hadleClick}
                list={pazzleList}
                currentRightLetter={currentRightLetter}
                clickedIndex={clickedIndex}
            />
        </QuizCard>
    );
}