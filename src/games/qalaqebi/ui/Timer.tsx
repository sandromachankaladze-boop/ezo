import { StyleSheet, View } from 'react-native';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';
import { ROUND_SECONDS } from '../logic/scoring';

const SEGMENTS = 15;

// Pixel progress bar for the countdown: green, then yellow, then red.
export function TimerBar({ seconds }: { seconds: number }) {
  const color = seconds > 20 ? arcade.green : seconds > 10 ? arcade.yellow : arcade.red;
  const filled = Math.ceil((seconds / ROUND_SECONDS) * SEGMENTS);
  return (
    <View
      style={styles.wrap}
      accessibilityRole="progressbar"
      accessibilityLabel={t.qalaqebi.time}
      accessibilityValue={{ min: 0, max: ROUND_SECONDS, now: seconds }}>
      <View style={styles.head}>
        <Txt weight="bold" style={styles.label}>
          {t.qalaqebi.time}
        </Txt>
        <Txt weight="pixel" style={[styles.num, { color }]}>
          {seconds}
        </Txt>
      </View>
      <View style={styles.bar}>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <View key={i} style={[styles.seg, { backgroundColor: i < filled ? color : '#D9CCE8' }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, gap: 6 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 12, color: arcade.crtText },
  num: { fontSize: 14 },
  bar: {
    flexDirection: 'row',
    gap: 2,
    padding: 3,
    borderWidth: 3,
    borderColor: arcade.ink,
    borderRadius: 6,
    backgroundColor: arcade.cream,
  },
  seg: { flex: 1, height: 12 },
});
