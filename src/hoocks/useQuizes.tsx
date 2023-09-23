import { useContext } from 'react';
import QuizListen from '../components/Quizes/QuizListen';
import QuizReverseTranslate from '../components/Quizes/QuizReverseTranslate';
import QuizSpell from '../components/Quizes/QuizSpell';
import QuizTranslate from '../components/Quizes/QuizTranslate';
import { Context, StoreContextType } from '../context/Context';
import { QuizType } from '../models/IQuiz';
import QuizPreview from '../components/Quizes/QuizPreview';

export type QuizNameType =
  | 'Translate'
  | 'ReverseTranslate'
  | 'Listen'
  | 'Spell';
const quizes: Record<QuizNameType, QuizType> = {
  Translate: QuizTranslate,
  ReverseTranslate: QuizReverseTranslate,
  Listen: QuizListen,
  Spell: QuizSpell,
};

const useQuizes = (): QuizType[] => {
  const { user } = useContext<StoreContextType>(Context);
  const userQuizes = user.settings.allowedQuizes.map(
    (quizName) => quizes[quizName],
  );
  userQuizes.unshift(QuizPreview);
  return userQuizes;
};

export default useQuizes;
