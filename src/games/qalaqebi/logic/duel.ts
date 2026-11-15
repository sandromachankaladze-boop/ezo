// 2-player mode ("duel") on one phone: same letter, players take turns.
import { normalize } from '@/utils/georgian';
import { Category } from './categories';
import { FieldResult, RoundResult, scoreRound } from './scoring';

export type Turn = { answers: Record<Category, string>; secondsLeft: number };

export type DuelResult = {
  players: [RoundResult, RoundResult];
  winner: 0 | 1 | 'tie';
};

// Classic yard rule: if both players wrote the same word, each gets half the points.
function halve(field: FieldResult): FieldResult {
  return { ...field, points: Math.ceil(field.points / 2), shared: true };
}

function total(r: RoundResult, fields: FieldResult[]): RoundResult {
  const base = fields.reduce((s, f) => s + f.points, 0);
  return { ...r, fields, base, total: base + r.timeBonus };
}

export function scoreDuel(letter: string, a: Turn, b: Turn): DuelResult {
  const ra = scoreRound(letter, a.answers, a.secondsLeft);
  const rb = scoreRound(letter, b.answers, b.secondsLeft);

  const fa = ra.fields.map((f, i) => {
    const g = rb.fields[i];
    const same = f.points > 0 && g.points > 0 && normalize(f.answer) === normalize(g.answer);
    return same ? halve(f) : f;
  });
  const fb = rb.fields.map((g, i) => (fa[i].shared ? halve(g) : g));

  const p0 = total(ra, fa);
  const p1 = total(rb, fb);
  const winner = p0.total === p1.total ? 'tie' : p0.total > p1.total ? 0 : 1;
  return { players: [p0, p1], winner };
}
