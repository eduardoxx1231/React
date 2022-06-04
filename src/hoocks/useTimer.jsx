import {useRef} from 'react';

export default function useTimer(time) {
	const timer = useRef(undefined);
	return {
		startTimer: (cb) => {
			timer.current = (setTimeout(()=>{
				cb();
				timer.current = undefined;
			}, time));
		},
		stopTimer: () => {
			clearTimeout(timer.current);
			timer.current = undefined;
		},
		timerActive: () => timer.current !== undefined,
	};
}