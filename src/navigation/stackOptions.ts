import type { Stack } from 'expo-router';
import type { ComponentProps } from 'react';
import { t } from '@/i18n';
import { colors, fonts } from '@/theme';

// Shared header style for all screens
export const stackScreenOptions: ComponentProps<typeof Stack>['screenOptions'] = {
  headerStyle: { backgroundColor: colors.paper },
  headerTintColor: colors.ink,
  headerTitleStyle: { fontFamily: fonts.bold, color: colors.ink },
  headerShadowVisible: false,
  headerBackTitle: t.common.back,
  contentStyle: { backgroundColor: colors.paper },
};
