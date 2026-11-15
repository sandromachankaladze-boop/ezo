// Cities game rules: picking a letter, checking answers, scoring. No UI here.
import { normalize } from '@/utils/georgian';
import { Category, CATEGORY_KEYS } from './categories';
import { DICTIONARY, LETTERS } from './dictionary';

export const ROUND_SECONDS = 60;

export type Verdict = 'correct' | 'unknown' | 'wrong-letter' | 'empty';

export type FieldResult = {
  category: Category;
  answer: string;
  verdict: Verdict;
  points: number;
};

export type RoundResult = {
  fields: FieldResult[];
  base: number;
  timeBonus: number;
  total: number;
};

// Points: a word found in the dictionary = 10. A word with the right first letter
// that is not in the dictionary = 5 (it may be correct, our list is just incomplete).
export const POINTS: Record<Verdict, number> = {
  correct: 10,
  unknown: 5,
  'wrong-letter': 0,
  empty: 0,
};

export function randomLetter(exclude?: string): string {
  const pool = LETTERS.filter((l) => l !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function checkAnswer(category: Category, letter: string, answer: string): Verdict {
  const w = normalize(answer);
  if (!w) return 'empty';
  if (w[0] !== letter) return 'wrong-letter';
  const dict = DICTIONARY[category];
  // Accept the word with or without the final "ი" (e.g. "ლონდონ" / "ლონდონი")
  if (dict.has(w) || dict.has(w + 'ი')) return 'correct';
  if (w.length < 2) return 'wrong-letter';
  return 'unknown';
}

// Time bonus: half the seconds left, multiplied by the share of answers that scored
// (so finishing fast with empty or wrong answers does not pay off).
export function scoreRound(
  letter: string,
  answers: Record<Category, string>,
  secondsLeft: number,
): RoundResult {
  const fields: FieldResult[] = CATEGORY_KEYS.map((key) => {
    const verdict = checkAnswer(key, letter, answers[key] ?? '');
    return { category: key, answer: answers[key]?.trim() ?? '', verdict, points: POINTS[verdict] };
  });
  const base = fields.reduce((s, f) => s + f.points, 0);
  const scored = fields.filter((f) => f.points > 0).length;
  const timeBonus = Math.floor((secondsLeft / 2) * (scored / fields.length));
  return { fields, base, timeBonus, total: base + timeBonus };
}
