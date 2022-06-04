import React, { useEffect, useState } from 'react';
import useAsyncEffect from '../../hoocks/useAsyncEffect';
import QuizCard from '../../common/layout/quizCard/QuizCard';

import { IQuizProps } from '../../models/IQuiz';
import { randomIndex } from '../../utils/random';
import WordsList from '../../common/layout/wordList/WordsList';
import WordsListItem from '../../common/layout/wordList/WordsListItem';
import DictionaryServoce from '../../services/DictionaryServoce';

import { MAX_WORDS_VARIANTS } from '../../constants';


export default function QuizTranslate({pazzleWord, next}: IQuizProps): JSX.Element {
    
    const [pazzleList, setPazzleList] = useState<string[]>([]);
    const [choosenWord, setChoosenWord] = useState('');
    const [allowNext, setAllowNext] = useState<boolean>(false);
    const [isAnswerRight, setIsAnswerRight] = useState<boolean>(true);
    
    useEffect(() => {
        if (pazzleWord.word === choosenWord) {
            setAllowNext(true);
        }        
    }, [choosenWord]);

    useAsyncEffect(() => {
		// await
        const fakeWords = DictionaryServoce
            .getFakeWords(pazzleWord.word)
            .map(item => item.word);
        const resultList = [...fakeWords];
        const rightAnswerIndex = randomIndex(MAX_WORDS_VARIANTS - 1);
        resultList.splice(rightAnswerIndex, 0, pazzleWord.word);
        setPazzleList(resultList);
    }, [pazzleWord.word]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        const choosen = target.dataset.value;
        if (choosen) {
            console.log(choosen, pazzleWord.word);
            setChoosenWord(choosen);
            if (isAnswerRight) {
				setIsAnswerRight(pazzleWord.word === choosen)
            }
        }
    };

    const handleNextWord = () => {
        // setChoosenWord('');
        // setAllowNextWord(false);
        // setPazzleList([]);
		next(isAnswerRight);
    }

    const buldList = pazzleList.map((item, index)=>
        <WordsListItem 
            key={index}
            text={item}
            isRight={item === pazzleWord.word}
            checked={item === choosenWord}
        />
    );

    return (
        <QuizCard
            title='Translate to English'
            pazzle={pazzleWord.translation} 
            disabledNext={!allowNext} 
            handleNextWord={handleNextWord}
        >
            <WordsList onClick={handleClick}>
                {buldList}
            </WordsList>
        </QuizCard>
    );
}