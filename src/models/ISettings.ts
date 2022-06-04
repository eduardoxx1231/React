import { QuizNameType } from "../hoocks/useQuizes";

export interface ISettings {
    allowVioce: boolean;
    allowedQuizes: string[];
    quizes: QuizNameType[];
}