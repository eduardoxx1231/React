import React from 'react';

import QuizCard from '../../common/layout/quizCard/QuizCard';

import { IQuizProps } from '../../models/IQuiz';

export default function QuizPreview({
  pazzleWord,
  next,
}: IQuizProps): JSX.Element {
  const handleNextWord = () => {
    next(true);
  };

  return (
    <QuizCard
      title="Preview"
      pazzle={pazzleWord.word}
      disabledNext={false}
      handleNextWord={handleNextWord}
    >
      <div className="p-2 text-light d-flex justify-content-center">
        {pazzleWord.translation}
      </div>
      <div>{pazzleWord.note || ''}</div>
    </QuizCard>
  );
}
