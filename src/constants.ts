export const MAX_WORDS_VARIANTS = 4;

export const skipedChars = [' ', ','];

export const maxQuizWords = 6;
// Limits by atempts - 3 success atempts -> 1 word
export const limits: Record<number, number> = {
  0: 0,
  1: 2,
  2: 2,
  3: 1,
  4: 1,
};
