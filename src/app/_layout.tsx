import {
  NotoSansGeorgian_400Regular,
  NotoSansGeorgian_700Bold,
  NotoSansGeorgian_900Black,
  useFonts,
} from '@expo-google-fonts/noto-sans-georgian';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { t } from '@/i18n';
import { stackScreenOptions } from '@/navigation/stackOptions';

// Keep the splash screen visible until the font has loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // The font is bundled with the app, so it works offline.
  const [loaded, error] = useFonts({
    NotoSansGeorgian_400Regular,
    NotoSansGeorgian_700Bold,
    NotoSansGeorgian_900Black,
    PressStart2P_400Regular,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="qalaqebi" options={{ title: t.games.qalaqebi.title }} />
      </Stack>
    </>
  );
}
