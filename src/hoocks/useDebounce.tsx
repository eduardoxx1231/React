import { useEffect } from 'react';
import useTimer from './useTimer';

export default function useDebounce(func: (args: any) => void, time: number) {
  const { startTimer, stopTimer } = useTimer(time);

  useEffect(() => {
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return function (args: any) {
    stopTimer();
    startTimer(() => func(args));
  };
}
