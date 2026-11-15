import { Verdict } from '../logic/scoring';

// Verdict colours, dark enough to read on the cream window body.
export const VERDICT_COLOR: Record<Verdict, string> = {
  correct: '#1E7A34',
  unknown: '#B05A00',
  'wrong-letter': '#C62828',
  empty: '#C62828',
};

export const SHARED_COLOR = '#B05A00';
