// "ქალაქების" წესები: ასოს არჩევა, პასუხის შემოწმება, ქულები. აქ UI არ არის.
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

// ქულები: ლექსიკონში მოძებნილი სიტყვა 10 ქულაა. სწორ ასოზე დაწყებული, მაგრამ
// ლექსიკონში ვერ ნაპოვნი სიტყვა 5 ქულაა (შეიძლება სწორია, უბრალოდ სიაში არ გვაქვს).
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
  // "ლონდონ" ან "ლონდონი": ორივე ჩაითვალოს
  if (dict.has(w) || dict.has(w + 'ი')) return 'correct';
  if (w.length < 2) return 'wrong-letter';
  return 'unknown';
}

// დროის ბონუსი: დარჩენილი წამების ნახევარი, გამრავლებული ქულიანი პასუხების წილზე
// (ასე ცარიელი ან შეცდომიანი პასუხებით ჩქარა დასრულება არ გამოგადგება).
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
