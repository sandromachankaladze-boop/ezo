import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { PixelIcon, PixelIconName } from './PixelIcon';

type Tab = { key: string; label: string; icon: PixelIconName };

const TABS: Tab[] = [
  { key: 'home', label: t.nav.home, icon: 'house' },
  { key: 'records', label: t.nav.records, icon: 'trophy' },
  { key: 'challenge', label: t.nav.challenge, icon: 'bolt' },
  { key: 'settings', label: t.nav.settings, icon: 'gear' },
];

// Pixel-style tab bar. Only "home" exists for now; the others are shown but not active yet.
export function BottomNav({ active = 'home' }: { active?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={t.nav.label}
      style={[styles.bar, { paddingBottom: 5 + insets.bottom, height: 58 + insets.bottom }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const ready = tab.key === 'home';
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive, disabled: !ready }}
            disabled={!ready}
            style={[styles.tab, isActive && styles.tabActive, !ready && { opacity: 0.55 }]}>
            <PixelIcon name={tab.icon} size={18} color={isActive ? arcade.ink : undefined} />
            <Txt weight="black" style={[styles.label, { color: isActive ? arcade.ink : arcade.lavender }]}>
              {tab.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: 6,
    paddingTop: 5,
    paddingHorizontal: 8,
    backgroundColor: arcade.building,
    borderTopWidth: 3,
    borderTopColor: arcade.ink,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: arcade.yellow,
    borderColor: arcade.ink,
    shadowColor: arcade.buildingEdge,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  label: { fontSize: 10, lineHeight: 12 },
});
