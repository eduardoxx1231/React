export type WordStatusType = 'unknown' | 'study' | 'learned';
export interface IWord {
  id: string;
  word: string;
  translation: string;
  status: WordStatusType;
  lastSuccessful: Date | string;
  attempts: number;
  successfulAttempts: number;
  active: boolean;
  note?: string;
}
