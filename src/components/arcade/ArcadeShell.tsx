import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { arcade } from '@/theme';
import { BottomNav } from './BottomNav';
import { CompactMarquee } from './CompactMarquee';
import { ControlDeck } from './ControlDeck';
import { CrtScreen } from './CrtScreen';
import { YardBackground } from './YardBackground';

type Props = {
  title: string;
  onBack?: () => void;
  deck?: React.ComponentProps<typeof ControlDeck>; // show the control deck (menus)
  nav?: boolean; // show the bottom navigation (menus, not during a game)
  scroll?: boolean; // let the screen content scroll
  children: React.ReactNode; // what is shown on the CRT screen
};

// Standard game screen: yard background, slim marquee, CRT screen, optional deck and bottom nav.
export function ArcadeShell({ title, onBack, deck, nav, scroll, children }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <YardBackground />
      <SafeAreaView edges={nav ? ['top'] : ['top', 'bottom']} style={styles.safe}>
        <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.cabinet, !nav && { marginBottom: 12 }]}>
            <CompactMarquee title={title} onBack={onBack} />
            <CrtScreen scroll={scroll}>{children}</CrtScreen>
            {deck ? <ControlDeck {...deck} /> : <View style={styles.base} />}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {nav && <BottomNav active="home" />}
    </View>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: arcade.night },
  safe: { flex: 1 },
  cabinet: { flex: 1, marginHorizontal: 18, marginTop: 14 },
  base: {
    height: 14,
    backgroundColor: arcade.magentaDark,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: arcade.ink,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
