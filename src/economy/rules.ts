// Coin economy: "pocket money" (ჯიბის ფული). Pure rules, no React, no storage.
// Numbers agreed in docs/decisions.md (2026-11-15). Change them here to rebalance.

export const POCKET_MONEY = 10; // free coins each new day
export const STREAK_STEP = 2; // extra coins per day in a row ...
export const STREAK_MAX = 10; // ... up to this much
export const ROUND_COST = 1; // one round (2 players share one coin)
export const CREDIT_MINUTES = 30; // with 0 coins: one free round every 30 minutes ("ნისია")

export const REWARD = {
  round: 1, // every finished round
  goodRound: 1, // solo score of 30 or more
  goodRoundScore: 30,
  record: 3, // new personal record
  duelWin: 2, // a 2-player round with a winner (no tie)
};

export type Wallet = {
  coins: number;
  lastPocketDay: string | null; // 'YYYY-MM-DD' of the last pocket money
  streak: number; // days in a row with pocket money
  lastCreditAt: number | null; // time (ms) of the last free round on credit
};

export const NEW_WALLET: Wallet = { coins: 0, lastPocketDay: null, streak: 0, lastCreditAt: null };

// Local calendar day, e.g. '2026-11-15'
export function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function yesterdayKey(now: Date): string {
  const y = new Date(now);
  y.setDate(y.getDate() - 1);
  return dayKey(y);
}

export type PocketGift = { pocket: number; streakBonus: number; streak: number; total: number };

// What grandma gives today, or null if today's pocket money was already taken.
export function pocketMoneyToday(w: Wallet, now: Date): PocketGift | null {
  if (w.lastPocketDay === dayKey(now)) return null;
  const streak = w.lastPocketDay === yesterdayKey(now) ? w.streak + 1 : 1;
  const streakBonus = Math.min(STREAK_STEP * (streak - 1), STREAK_MAX);
  return { pocket: POCKET_MONEY, streakBonus, streak, total: POCKET_MONEY + streakBonus };
}

export function claimPocketMoney(w: Wallet, now: Date): Wallet {
  const gift = pocketMoneyToday(w, now);
  if (!gift) return w;
  return { ...w, coins: w.coins + gift.total, lastPocketDay: dayKey(now), streak: gift.streak };
}

// When the next free round on credit is available (only matters with 0 coins).
export function creditReadyAt(w: Wallet): number {
  return w.lastCreditAt === null ? 0 : w.lastCreditAt + CREDIT_MINUTES * 60_000;
}

export type Payment = 'coin' | 'credit';

// How the next round would be paid, or null if the player has to wait.
export function howToPay(w: Wallet, now: number): Payment | null {
  if (w.coins >= ROUND_COST) return 'coin';
  if (now >= creditReadyAt(w)) return 'credit';
  return null;
}

export function payForRound(w: Wallet, now: number): Wallet | null {
  const how = howToPay(w, now);
  if (how === 'coin') return { ...w, coins: w.coins - ROUND_COST };
  if (how === 'credit') return { ...w, lastCreditAt: now };
  return null;
}

export type RewardKey = 'round' | 'goodRound' | 'record' | 'duelWin';
export type RewardLine = { key: RewardKey; amount: number };

export function soloReward(score: number, newRecord: boolean): RewardLine[] {
  const lines: RewardLine[] = [{ key: 'round', amount: REWARD.round }];
  if (score >= REWARD.goodRoundScore) lines.push({ key: 'goodRound', amount: REWARD.goodRound });
  if (newRecord) lines.push({ key: 'record', amount: REWARD.record });
  return lines;
}

export function duelReward(hasWinner: boolean): RewardLine[] {
  const lines: RewardLine[] = [{ key: 'round', amount: REWARD.round }];
  if (hasWinner) lines.push({ key: 'duelWin', amount: REWARD.duelWin });
  return lines;
}

export const sumReward = (lines: RewardLine[]) => lines.reduce((s, l) => s + l.amount, 0);

export function addCoins(w: Wallet, amount: number): Wallet {
  return { ...w, coins: w.coins + amount };
}
