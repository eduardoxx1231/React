import { randomIndex as random } from './random';

export const shuffle = (array: any[]) => {
	let currentIndex = array.length - 1;
	let randomIndex;
	while (currentIndex !== 0) {
		randomIndex = random(currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }