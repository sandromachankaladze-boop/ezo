import {
  NotoSansGeorgian_400Regular,
  NotoSansGeorgian_700Bold,
  NotoSansGeorgian_900Black,
  useFonts,
} from '@expo-google-fonts/noto-sans-georgian';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { colors, fonts } from '@/theme';

// ფონტის ჩატვირთვამდე საწყისი ეკრანი (splash) დარჩეს ხილული.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // ფონტი აპშივეა ჩაშენებული, ამიტომ ინტერნეტი არ სჭირდება (ოფლაინიც მუშაობს).
  const [loaded, error] = useFonts({
    NotoSansGeorgian_400Regular,
    NotoSansGeorgian_700Bold,
    NotoSansGeorgian_900Black,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.paper },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontFamily: fonts.bold, color: colors.ink },
          headerShadowVisible: false,
          headerBackTitle: 'უკან',
          contentStyle: { backgroundColor: colors.paper },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="qalaqebi" options={{ title: 'ქალაქები' }} />
      </Stack>
    </>
  );
}
