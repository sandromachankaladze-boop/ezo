import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import { arcade } from '@/theme';
import { Scanlines } from './Patterns';

// The cabinet's screen: magenta body, steel bezel, dark glass with scanlines and a blue glow.
// `scroll`: content scrolls inside the glass (long results, typing with the keyboard open).
export function CrtScreen({ children, style, scroll }: ViewProps & { scroll?: boolean }) {
  return (
    <View style={styles.body}>
      <View style={styles.bezel}>
        <View style={[styles.glass, scroll && styles.glassScroll, style]}>
          <Scanlines />
          {scroll ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: arcade.magenta,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderLeftColor: arcade.magentaDark,
    borderRightColor: arcade.berry,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  bezel: {
    flex: 1,
    backgroundColor: arcade.steel,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 18,
    padding: 11,
  },
  glass: {
    flex: 1,
    backgroundColor: arcade.crt,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    gap: 10,
    overflow: 'hidden',
    shadowColor: arcade.blue,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  glassScroll: { padding: 0 },
  scrollContent: { padding: 12, gap: 12, flexGrow: 1 },
});
