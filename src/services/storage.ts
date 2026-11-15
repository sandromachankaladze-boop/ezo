// Saving data on the phone (offline). Screens never use AsyncStorage directly.
import AsyncStorage from '@react-native-async-storage/async-storage';

const bestKey = (gameId: string) => `${gameId}.best`;

export async function getBestScore(gameId: string): Promise<number> {
  const v = await AsyncStorage.getItem(bestKey(gameId));
  return v ? Number(v) : 0;
}

export async function setBestScore(gameId: string, score: number): Promise<void> {
  await AsyncStorage.setItem(bestKey(gameId), String(score));
}
