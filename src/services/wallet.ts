// The coin wallet, saved on the phone. Screens read it with useWallet() and change it only
// through the functions below, so every coin counter on screen stays in sync.
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addCoins,
  claimPocketMoney,
  NEW_WALLET,
  payForRound,
  Wallet,
} from '@/economy/rules';

const KEY = 'wallet';
let current: Wallet = NEW_WALLET;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

async function save(next: Wallet) {
  current = next;
  emit();
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function loadWallet(): Promise<Wallet> {
  if (!loaded) {
    const raw = await AsyncStorage.getItem(KEY);
    current = raw ? { ...NEW_WALLET, ...JSON.parse(raw) } : NEW_WALLET;
    loaded = true;
    emit();
  }
  return current;
}

export const getWallet = () => current;
export const isWalletLoaded = () => loaded;

export function subscribeWallet(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export async function collectPocketMoney(now = new Date()) {
  await save(claimPocketMoney(await loadWallet(), now));
}

// Returns false if the round can't be paid (no coins and the credit isn't ready yet).
export async function payRound(now = Date.now()): Promise<boolean> {
  const next = payForRound(await loadWallet(), now);
  if (!next) return false;
  await save(next);
  return true;
}

export async function earnCoins(amount: number) {
  await save(addCoins(await loadWallet(), amount));
}
