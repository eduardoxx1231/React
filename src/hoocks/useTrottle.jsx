import {useEffect} from 'react';
import useTimer from './useTimer';

export default function useTrottle(func, time) {
	const {startTimer, stopTimer, timerActive} = useTimer(time);

	useEffect(()=>{
		return () => stopTimer();
	}, []);

	return function (...args) {
		console.log(args);
		if (timerActive()) return;
		func(...args);
		startTimer(() => {});
	}
}