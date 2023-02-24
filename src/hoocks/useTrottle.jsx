import { useEffect } from 'react';
import useTimer from './useTimer';

export default function useTrottle(func, time) {
  const { startTimer, stopTimer, timerActive } = useTimer(time);

  useEffect(() => {
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return function (...args) {
    if (timerActive()) return;
    func(...args);
    startTimer(() => {});
  };
}
