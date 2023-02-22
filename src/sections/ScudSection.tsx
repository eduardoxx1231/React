import React, { useState } from 'react';
import EndCard from '../common/layout/quizCard/EndCard';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import useQuizes from '../hoocks/useQuizes';
import useStatistic from '../hoocks/useStatistic';
import useVocabulary from '../hoocks/useVocabulary';
import { IWord } from '../models/IWord';
import { shuffle } from '../utils/shuffle';
import { filterToStudy } from '../utils/wordUtils';

enum Status {
  Start,
  Play,
  End,
}

export default function ScudSection() {
  const { vocabulary } = useVocabulary();
  const words = filterToStudy(vocabulary);
  const quizes = useQuizes();
  const { saveStatistic } = useStatistic();
  const defaultStatistic = words.reduce((result, word) => {
    result[word.id] = true;
    return result;
  }, {} as Record<IWord['id'], boolean>);

  const [status, setStatus] = useState(Status.Start);
  const [pazzleWords, setPazzleWords] = useState(words);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [statistic, setStatistic] = useState(defaultStatistic);

  const handleNext = (result: boolean) => {
    const wordId = pazzleWords[currentWordIndex].id;
    if (statistic[wordId]) {
      const newResults = { ...statistic };
      newResults[wordId] = result;
      setStatistic(newResults);
    }
    if (
      currentQuizIndex === quizes.length - 1 &&
      currentWordIndex === words.length - 1
    ) {
      setIsFinish(true);
      return;
    }
    if (currentWordIndex === words.length - 1) {
      setPazzleWords(shuffle(pazzleWords));
      setCurrentWordIndex(0);
      setCurrentQuizIndex(currentQuizIndex + 1);
      return;
    }
    setCurrentWordIndex(currentWordIndex + 1);
  };

  useAsyncEffect(async () => {
    if (!isFinish) return;

    const updatedWords = words.map((word) => {
      word.attempts += 1;
      if (statistic[word.id]) {
        word.successfulAttempts += 1;
        word.lastSuccessful = new Date();
      }
      if (word.successfulAttempts === 5) {
        word.status = 'learned';
        word.active = false;
      }
      return {
        id: word.id,
        attempts: word.attempts + 1,
        ...(statistic[word.id] && { lastSuccessful: new Date() }),
        ...(statistic[word.id] && {
          successfulAttempts: word.successfulAttempts + 1,
        }),
      };
    });
    await saveStatistic(updatedWords);
    setIsFinish(false);
    setStatus(Status.End);
  }, [isFinish]);

  if (!words.length) return <h3>No words to learn</h3>;

  const CurrentQuiz = quizes[currentQuizIndex];
  switch (status) {
    case Status.Start:
      return (
        <CurrentQuiz
          key={pazzleWords[currentWordIndex].word}
          pazzleWord={pazzleWords[currentWordIndex]}
          next={handleNext}
        />
      );
    // return <StartCard onClick={()=>{}/>
    case Status.End:
      return <EndCard statistic={statistic} pazzleWords={pazzleWords} />;
    default:
      return (
        <CurrentQuiz
          key={pazzleWords[currentWordIndex].word}
          pazzleWord={pazzleWords[currentWordIndex]}
          next={handleNext}
        />
      );
  }
}
