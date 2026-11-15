import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';

// The glowing sign on top of the cabinet: neon "ეზო" and a row of bulbs.
export function Marquee() {
  return (
    <View style={styles.marquee}>
      <View style={styles.sign}>
        <Txt weight="black" style={styles.logo} accessibilityRole="header">
          {t.home.title}
        </Txt>
        <Txt weight="bold" style={styles.sub}>
          {t.arcade.marqueeSub}
        </Txt>
      </View>
      <View style={styles.bulbs}>
        {Array.from({ length: 10 }, (_, i) => (
          <View key={i} style={styles.bulb} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marquee: {
    height: 78,
    backgroundColor: arcade.berry,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 7,
    gap: 5,
  },
  sign: {
    flex: 1,
    backgroundColor: arcade.night,
    borderWidth: 2,
    borderColor: arcade.ink,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logo: {
    fontSize: 34,
    lineHeight: 44,
    color: arcade.orange,
    letterSpacing: 2,
    textShadowColor: arcade.magenta,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  sub: { fontSize: 11, lineHeight: 13, color: arcade.yellow },
  bulbs: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  bulb: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: arcade.bulb,
    shadowColor: arcade.yellow,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
});
