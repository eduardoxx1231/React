import { IWord } from '../models/IWord';
import { limits }  from '../constants';
import { skipedChars, maxQuizWords} from '../constants';

const milisecondsOfDay = 1000*60*60*24

export const splitByWords = (str: string): string[] => {
    const skippedCharsWithoutSpace = skipedChars.filter(c => c !== ' ');
    const reg = new RegExp(`[${skippedCharsWithoutSpace.join('')}]`, 'g');
    const clearStr = str.replace(reg,'').replace(/\s\s+/g, ' ');
    return clearStr.split(' ');
}

export function filterToStudy(vocabulary: IWord[]): IWord[] {
    const counters: number[] = [0, 0, 0, 0, 0];
    const currentDate = new Date();

    const allows: IWord[] = vocabulary.filter((w) => {
        if (!w.active || w.status === 'learned') return false;
        return true;
    });
    const actuals = allows.filter((w)=> {
        const lastSuccessful = new Date(w.lastSuccessful);
        const daysPassed = Math.abs(Math.round(
            (currentDate.getTime() - lastSuccessful.getTime())/milisecondsOfDay
        ));
        switch (w.successfulAttempts) {
            case 1:
                return daysPassed >= 1;
            case 2:
                return daysPassed >= 6;
            case 3:
                return daysPassed >= 25;
            default:
                return false;
        }
    });
    const resultWords = actuals.reduce((limitedWords, w) => {
        counters[w.successfulAttempts] += 1;
        if (counters[w.successfulAttempts] >
            limits[w.successfulAttempts]) {
				return limitedWords;
		}
		limitedWords.push(w);
        return limitedWords 
    },[]);

    const additionNewWords = allows
        .filter((w)=> w.successfulAttempts === 0)
        .slice(0, maxQuizWords - resultWords.length);
    resultWords.push(...additionNewWords);
	return resultWords;
}