import { useEffect, useSyncExternalStore } from 'react';
import { getWallet, isWalletLoaded, loadWallet, subscribeWallet } from '@/services/wallet';

// Current wallet; the screen re-renders whenever coins change anywhere in the app.
export function useWallet() {
  const wallet = useSyncExternalStore(subscribeWallet, getWallet);
  const loaded = useSyncExternalStore(subscribeWallet, isWalletLoaded);
  useEffect(() => {
    loadWallet();
  }, []);
  return { wallet, loaded };
}
