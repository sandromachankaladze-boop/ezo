import { Pressable, StyleSheet, View } from 'react-native';
import { ArcadeWindow } from '@/components/arcade/ArcadeWindow';
import { NeonLetter } from '@/components/arcade/NeonLetter';
import { PixelIcon } from '@/components/arcade/PixelIcon';
import { Txt } from '@/components/Txt';
import { t } from '@/i18n';
import { arcade } from '@/theme';

type Props = {
  best: number;
  mode: 0 | 1; // 0 = 1 player, 1 = 2 players
  onPick: (mode: 0 | 1) => void; // tap: select, tap again: start
};

// Mode menu: title, rules window, and "▶ 1 / 2 players" like an arcade start screen.
export function Intro({ best, mode, onPick }: Props) {
  const modes: { n: string; sub?: string; label: string }[] = [
    { n: '1', label: t.qalaqebi.solo },
    { n: '2', sub: t.qalaqebi.oneDevice, label: t.qalaqebi.duel },
  ];

  return (
    <>
      <View style={styles.titleRow}>
        <NeonLetter letter="ქ" size={56} />
        <Txt weight="black" style={styles.title} numberOfLines={1}>
          {t.games.qalaqebi.title}
        </Txt>
        {best > 0 && (
          <View style={styles.best} accessible accessibilityLabel={t.qalaqebi.yourRecord(best)}>
            <PixelIcon name="star" size={16} />
            <Txt weight="pixel" style={styles.bestNum}>
              {best}
            </Txt>
          </View>
        )}
      </View>

      <ArcadeWindow title={t.qalaqebi.rulesTitle}>
        {t.qalaqebi.rules.map((rule) => (
          <Txt key={rule} style={styles.rule}>
            {rule}
          </Txt>
        ))}
      </ArcadeWindow>

      <View accessibilityRole="radiogroup" style={{ gap: 6 }}>
        {modes.map((m, i) => {
          const selected = i === mode;
          const color = selected ? arcade.green : arcade.muted;
          return (
            <Pressable
              key={m.n}
              accessibilityRole="radio"
              accessibilityLabel={m.label}
              accessibilityState={{ checked: selected }}
              onPress={() => onPick(i as 0 | 1)}
              style={[styles.row, selected && styles.rowSelected]}>
              <View style={styles.cursor}>{selected && <PixelIcon name="cursor" size={18} />}</View>
              <Txt weight="pixel" style={[styles.n, { color }]}>
                {m.n}
              </Txt>
              <View style={{ flex: 1 }}>
                <Txt weight="black" style={[styles.label, { color }]}>
                  {t.qalaqebi.players}
                </Txt>
                {m.sub && <Txt style={styles.sub}>{m.sub}</Txt>}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Txt style={styles.hint}>{t.arcade.hintReady}</Txt>
    </>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: {
    flex: 1,
    fontSize: 26,
    lineHeight: 36,
    color: arcade.orange,
    textShadowColor: arcade.magenta,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  best: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  bestNum: { fontSize: 10, color: arcade.yellow },
  rule: { fontSize: 13, lineHeight: 19, color: arcade.ink },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 48,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  rowSelected: { backgroundColor: 'rgba(76,201,76,0.12)', borderColor: arcade.green },
  cursor: { width: 12 },
  n: { fontSize: 16 },
  label: { fontSize: 20, lineHeight: 28 },
  sub: { fontSize: 11, lineHeight: 14, color: arcade.crtText },
  hint: { textAlign: 'center', fontSize: 11, color: arcade.crtText },
});
