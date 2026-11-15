import type { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { t } from '@/i18n';
import { arcade, fonts } from '@/theme';

// Shared header style for all screens
export const stackScreenOptions: ComponentProps<typeof Stack>['screenOptions'] = {
  headerStyle: { backgroundColor: arcade.night },
  headerTintColor: arcade.cream,
  headerTitleStyle: { fontFamily: fonts.bold, color: arcade.cream },
  headerShadowVisible: false,
  headerBackTitle: t.common.back,
  contentStyle: { backgroundColor: arcade.night },
};
