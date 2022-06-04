import { useEffect } from 'react';
import useTimer from './useTimer';

export default function useDebounce(func: (args: any)=> void, time: number) {
	const { startTimer, stopTimer } = useTimer(time);

	useEffect(()=>{
		return () => stopTimer();
	}, []);

	return function (args: any) {
		stopTimer();
		startTimer(() => func(args));
	}
}